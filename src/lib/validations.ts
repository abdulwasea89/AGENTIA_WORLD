import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

export const otpSchema = z.object({
    code: z.string().min(6, "Verification code must be 6 digits").regex(/^\d+$/, "Must be numbers only")
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
