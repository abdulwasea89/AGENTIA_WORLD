"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/lib/validations";

const SignInPage = () => {
    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        if (!isLoaded) return;
        setIsLoading(true);

        try {
            const signInAttempt = await signIn.create({
                identifier: data.email,
                password: data.password,
                redirectUrl: "/dashboard"
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push('/dashboard');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
                toast.error("Invalid email or password");
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            const clerkError = err as { errors: Array<{ code: string }> };
            switch (clerkError.errors[0]?.code) {
                case 'form_identifier_not_found':
                    toast.error("This email is not registered. Please sign up first.");
                    break;
                case 'form_password_incorrect':
                    toast.error("Incorrect password. Please try again.");
                    break;
                case 'too_many_attempts':
                    toast.error("Too many attempts. Please try again later.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen text-foreground">
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-semibold tracking-tight text-primary">Sign In</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
                    </div>

                    {/* Social login buttons omitted for brevity */}

                    <div className="my-4 flex items-center gap-4">
                        <hr className="w-full border-gray-300" />
                        <p className="text-sm text-white text-center">OR</p>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                {...register("email")}
                                className="bg-secondary text-secondary-foreground"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                {...register("password")}
                                className="bg-secondary text-secondary-foreground"
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={isLoading}
                        >
                            {isLoading ? <LoaderIcon className="w-4 h-4 animate-spin" /> : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
