"use client";

import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSignUp } from '@clerk/nextjs';
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from "sonner";

const SignUpPage = () => {

    const { isLoaded, signUp, setActive } = useSignUp();

    const router = useRouter();

    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [code, setCode] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!name || !emailAddress || !password) {
            return toast.warning("Please fill in all fields");
        }

        setIsLoading(true);

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            setVerified(true);

            await signUp.update({
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1],
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));

            switch (err.errors[0]?.code) {
                case "form_identifier_exists":
                    toast.error("This email is already registered. Please sign in.");
                    break;
                case "form_password_pwned":
                    toast.error("The password is too common. Please choose a stronger password.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Invalid email address. Please enter a valid email address.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Password is too short. Please choose a longer password.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!code) {
            return toast.warning("Verification code is required");
        }

        setIsVerifying(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push('/dashboard');
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                toast.error("Invalid verification code");
            }
        } catch (err: any) {
            console.error('Error:', JSON.stringify(err, null, 2));
            toast.error("An error occurred. Please try again");
        } finally {
            setIsVerifying(false);
        }
    };

    return verified ? (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.icon className="h-6 mx-auto" />
                <h1 className="text-2xl font-semibold tracking-tight pt-2">
                    Please check your email
                </h1>
                <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a verification code to {emailAddress}
                </p>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="code">Verification code</Label>
                    <InputOTP
                        maxLength={6}
                        value={code}
                        disabled={isVerifying}
                        onChange={(e) => setCode(e)}
                    >
                        <InputOTPGroup className="justify-center w-full">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <Button type="submit" disabled={isVerifying}>
                    {isVerifying ? (
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                    ) : "Verify"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    Back to signup{" "}
                    <Button variant="link" type="button" disabled={isVerifying} onClick={() => setVerified(false)}>
                        Sign up
                    </Button>
                </p>
            </form>
        </div>
    ) : (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.icon className="h-6 mx-auto" />
                <h1 className="text-2xl font-semibold tracking-tight pt-2">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        disabled={isLoading}
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        disabled={isLoading}
                        value={emailAddress}
                        placeholder="name@example.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            disabled={isLoading}
                            value={password}
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div id="clerk-captcha"></div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <LoaderIcon className="w-4 h-4 animate-spin" />
                    ) : "Continue"}
                </Button>
            </form>

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
