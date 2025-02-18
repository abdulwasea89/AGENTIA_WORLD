"use client";

import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, otpSchema, type SignUpFormData, type OtpFormData } from "@/lib/validations";

const SignUpPage = () => {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [verified, setVerified] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const signUpForm = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: "", email: "", password: "" }
    });

    const otpForm = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: { code: "" }
    });

    const handleSignUp = async (data: SignUpFormData) => {
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.create({
                emailAddress: data.email,
                password: data.password,
            });

            // Send verification code
            await signUpAttempt.prepareEmailAddressVerification({ strategy: "email_code" });
            setSubmittedEmail(data.email);
            setVerified(true);

            // Update user name
            await signUp.update({
                firstName: data.name.split(" ")[0],
                lastName: data.name.split(" ")[1] || "",
            });

        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            const error = err as { errors?: Array<{ code?: string }> };
            switch (error.errors?.[0]?.code) {
                case 'form_identifier_exists':
                    toast.error("Email already registered. Please sign in instead.");
                    break;
                case 'form_password_length_too_short':
                    toast.error("Password must be at least 8 characters");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
            }
        }
    };

    const verifyOtp = async (data: OtpFormData) => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: data.code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            toast.error("Invalid verification code. Please try again.");
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.icon className="h-6 mx-auto" />
                <h1 className="text-2xl font-semibold tracking-tight pt-2">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details to get started
                </p>
            </div>

            {verified ? (
                <form onSubmit={otpForm.handleSubmit(verifyOtp)} className="flex flex-col gap-6">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            We&lsquo;ve sent a 6-digit code to {submittedEmail}
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="code">Verification Code</Label>
                        <Input
                            id="code"
                            placeholder="123456"
                            {...otpForm.register("code")}
                        />
                        {otpForm.formState.errors.code && (
                            <p className="text-sm text-red-500">
                                {otpForm.formState.errors.code.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={otpForm.formState.isSubmitting}>
                        {otpForm.formState.isSubmitting ? (
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                        ) : "Verify Code"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            {...signUpForm.register("name")}
                        />
                        {signUpForm.formState.errors.name && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            {...signUpForm.register("email")}
                        />
                        {signUpForm.formState.errors.email && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...signUpForm.register("password")}
                        />
                        {signUpForm.formState.errors.password && (
                            <p className="text-sm text-red-500">
                                {signUpForm.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={signUpForm.formState.isSubmitting}>
                        {signUpForm.formState.isSubmitting ? (
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                        ) : "Continue"}
                    </Button>
                </form>
            )}

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/signin"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
