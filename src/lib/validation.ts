import { z } from 'zod';

// Patient form validation schema
export const patientFormSchema = z.object({
  // Patient Information
  patientName: z.string()
    .trim()
    .min(1, { message: "Patient name is required" })
    .max(100, { message: "Patient name must be less than 100 characters" }),
  
  species: z.string()
    .min(1, { message: "Species is required" }),
  
  breed: z.string()
    .max(100, { message: "Breed must be less than 100 characters" })
    .optional(),
  
  age: z.string()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, { message: "Age must be between 0 and 100" })
    .optional(),
  
  gender: z.string().optional(),
  
  weight: z.string()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 1000;
    }, { message: "Weight must be between 0 and 1000 kg" })
    .optional(),
  
  color: z.string()
    .max(200, { message: "Color description must be less than 200 characters" })
    .optional(),
  
  microchip: z.string()
    .max(50, { message: "Microchip ID must be less than 50 characters" })
    .optional(),
  
  // Owner Information
  ownerName: z.string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(100, { message: "Owner name must be less than 100 characters" }),
  
  phone: z.string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[\d\s\+\-\(\)]+$/, { message: "Invalid phone number format" }),
  
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .optional()
    .or(z.literal('')),
  
  address: z.string()
    .max(500, { message: "Address must be less than 500 characters" })
    .optional(),
  
  emergencyContact: z.string()
    .max(20, { message: "Emergency contact must be less than 20 characters" })
    .regex(/^([\d\s\+\-\(\)]+)?$/, { message: "Invalid phone number format" })
    .optional(),
  
  // Medical Information
  allergies: z.string()
    .max(1000, { message: "Allergies must be less than 1000 characters" })
    .optional(),
  
  medications: z.string()
    .max(1000, { message: "Medications must be less than 1000 characters" })
    .optional(),
  
  conditions: z.string()
    .max(1000, { message: "Conditions must be less than 1000 characters" })
    .optional(),
  
  notes: z.string()
    .max(2000, { message: "Notes must be less than 2000 characters" })
    .optional(),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
