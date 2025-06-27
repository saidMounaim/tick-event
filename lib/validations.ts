import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createEventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  tickets: z.coerce.number().min(1, "At least 1 ticket"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  date: z.date({ required_error: "Event date is required" }),
  location: z.string().optional(),
  featuredImage: z.any().optional(),
  additionalImages: z.any().optional(),
});
