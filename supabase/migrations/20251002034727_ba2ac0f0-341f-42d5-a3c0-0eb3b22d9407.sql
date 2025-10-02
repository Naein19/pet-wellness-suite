-- Phase 1 & 2: Comprehensive Security Fix Migration (Fixed)
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'receptionist', 'accountant');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Migrate existing role data from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role::app_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Drop ALL old policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Remove role column from profiles (data already migrated)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Create new secure RLS policies for profiles
CREATE POLICY "Users can view own profile v2"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile v2"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles v2"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create patient-doctor assignment table
CREATE TABLE public.patient_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (patient_id, doctor_id)
);

ALTER TABLE public.patient_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_assignments FORCE ROW LEVEL SECURITY;

-- RLS policies for patient_assignments
CREATE POLICY "Admins can manage assignments"
ON public.patient_assignments
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Doctors can view their assignments"
ON public.patient_assignments
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'doctor') AND
  doctor_id = auth.uid()
);

CREATE POLICY "Receptionists can view assignments"
ON public.patient_assignments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'receptionist'));

-- Update patients table RLS policies with role-based access
DROP POLICY IF EXISTS "Authenticated users can view patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can insert patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can update patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can delete patients" ON public.patients;

-- Admins: Full access
CREATE POLICY "Admins have full access to patients"
ON public.patients
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Doctors: Full access to assigned patients and view all for medical purposes
CREATE POLICY "Doctors can view all patients"
ON public.patients
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Doctors can update assigned patients"
ON public.patients
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'doctor') AND
  EXISTS (
    SELECT 1 FROM public.patient_assignments
    WHERE patient_id = patients.id
    AND doctor_id = auth.uid()
  )
)
WITH CHECK (
  public.has_role(auth.uid(), 'doctor') AND
  EXISTS (
    SELECT 1 FROM public.patient_assignments
    WHERE patient_id = patients.id
    AND doctor_id = auth.uid()
  )
);

-- Receptionists: Can create and view basic info
CREATE POLICY "Receptionists can view patients"
ON public.patients
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'receptionist'));

CREATE POLICY "Receptionists can insert patients"
ON public.patients
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'receptionist'));

CREATE POLICY "Receptionists can update basic patient info"
ON public.patients
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'receptionist'))
WITH CHECK (public.has_role(auth.uid(), 'receptionist'));

-- Accountants: Read-only access
CREATE POLICY "Accountants can view patients for billing"
ON public.patients
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'accountant'));

-- Update appointments table RLS policies
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;
DROP POLICY IF EXISTS "Authenticated users can insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Authenticated users can update appointments" ON public.appointments;
DROP POLICY IF EXISTS "Authenticated users can delete appointments" ON public.appointments;

-- Admins: Full access
CREATE POLICY "Admins have full access to appointments"
ON public.appointments
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Doctors: Can view and manage their own appointments
CREATE POLICY "Doctors can view their appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'doctor') AND
  doctor_id = auth.uid()
);

CREATE POLICY "Doctors can update their appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'doctor') AND
  doctor_id = auth.uid()
)
WITH CHECK (
  public.has_role(auth.uid(), 'doctor') AND
  doctor_id = auth.uid()
);

-- Receptionists: Can manage all appointments
CREATE POLICY "Receptionists can view all appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'receptionist'));

CREATE POLICY "Receptionists can create appointments"
ON public.appointments
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'receptionist'));

CREATE POLICY "Receptionists can update appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'receptionist'))
WITH CHECK (public.has_role(auth.uid(), 'receptionist'));

CREATE POLICY "Receptionists can delete appointments"
ON public.appointments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'receptionist'));

-- Accountants: Read-only access
CREATE POLICY "Accountants can view appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'accountant'));