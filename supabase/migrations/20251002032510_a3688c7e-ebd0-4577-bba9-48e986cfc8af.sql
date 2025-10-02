-- Fix patients table security issue
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Authenticated users can manage patients" ON public.patients;
DROP POLICY IF EXISTS "Authenticated users can view patients" ON public.patients;

-- Ensure RLS is enabled
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner (prevents bypassing RLS)
ALTER TABLE public.patients FORCE ROW LEVEL SECURITY;

-- Create strict policy for viewing patient records (authenticated users only)
CREATE POLICY "Authenticated users can view patients"
  ON public.patients
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create strict policy for inserting patient records (authenticated users only)
CREATE POLICY "Authenticated users can insert patients"
  ON public.patients
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create strict policy for updating patient records (authenticated users only)
CREATE POLICY "Authenticated users can update patients"
  ON public.patients
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create strict policy for deleting patient records (authenticated users only)
CREATE POLICY "Authenticated users can delete patients"
  ON public.patients
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Similarly fix appointments table
DROP POLICY IF EXISTS "Authenticated users can manage appointments" ON public.appointments;
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments FORCE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert appointments"
  ON public.appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update appointments"
  ON public.appointments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete appointments"
  ON public.appointments
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);