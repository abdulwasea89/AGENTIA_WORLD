"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, otpSchema, type SignUpFormData, type OtpFormData } from "@/lib/validations"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

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

            await signUpAttempt.prepareEmailAddressVerification({ strategy: "email_code" });
            setSubmittedEmail(data.email);
            setVerified(true);

            await signUp.update({
                firstName: data.name.split(" ")[0],
                lastName: data.name.split(" ")[1] || "",
            });

        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            const error = err as { errors: Array<{ code: string }> };
            switch (error.errors[0]?.code) {
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
        <div className="flex flex-col lg:flex-row min-h-screen text-foreground">
            <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full space-y-6 sm:space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-primary">Create an account</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Enter your details to get started</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:justify-center">
                        <Button
                            variant="outline"
                            className="w-full justify-center gap-2 md:gap-3 py-5  border-primary hover:bg-primary/5 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512">
                                <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                                <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                                <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                                <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                                <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                                <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                            </svg>
                            <span className="text-sm md:text-base">Continue with Google</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-center gap-2 md:gap-3 py-5  border-primary hover:bg-primary/5 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20">
                                <path fill="currentColor" d="M20 10.25c0 2.234-.636 4.243-1.908 6.027c-1.271 1.784-2.914 3.018-4.928 3.703c-.234.045-.406.014-.514-.093a.539.539 0 0 1-.163-.4V16.67c0-.863-.226-1.495-.677-1.895a8.72 8.72 0 0 0 1.335-.24c.394-.107.802-.28 1.223-.52a3.66 3.66 0 0 0 1.055-.888c.282-.352.512-.819.69-1.402c.178-.583.267-1.252.267-2.008c0-1.077-.343-1.994-1.028-2.75c.32-.81.286-1.717-.105-2.723c-.243-.08-.594-.03-1.054.147a6.94 6.94 0 0 0-1.198.587l-.495.32a9.03 9.03 0 0 0-2.5-.346a9.03 9.03 0 0 0-2.5.347a11.52 11.52 0 0 0-.553-.36c-.23-.143-.593-.314-1.088-.514c-.494-.2-.868-.26-1.12-.18c-.381 1.005-.412 1.912-.09 2.722c-.686.756-1.03 1.673-1.03 2.75c0 .756.09 1.423.268 2.002c.178.578.406 1.045.683 1.401a3.53 3.53 0 0 0 1.048.894c.421.24.83.414 1.224.52c.395.108.84.188 1.335.241c-.347.32-.56.779-.638 1.375a2.539 2.539 0 0 1-.586.2a3.597 3.597 0 0 1-.742.067c-.287 0-.57-.096-.853-.287c-.282-.192-.523-.47-.723-.834a2.133 2.133 0 0 0-.631-.694c-.256-.178-.471-.285-.645-.32l-.26-.04c-.182 0-.308.02-.378.06c-.07.04-.09.09-.065.153a.738.738 0 0 0 .117.187a.961.961 0 0 0 .17.16l.09.066c.192.09.38.259.567.508c.187.249.324.476.41.68l.13.307c.113.338.304.612.574.821c.269.21.56.343.872.4c.312.058.614.09.905.094c.29.004.532-.011.723-.047l.299-.053c0 .338.002.734.007 1.188l.006.72c0 .16-.056.294-.17.4c-.112.108-.286.139-.52.094c-2.014-.685-3.657-1.92-4.928-3.703C.636 14.493 0 12.484 0 10.25c0-1.86.447-3.574 1.341-5.145a10.083 10.083 0 0 1 3.64-3.73A9.6 9.6 0 0 1 10 0a9.6 9.6 0 0 1 5.02 1.375a10.083 10.083 0 0 1 3.639 3.73C19.553 6.675 20 8.391 20 10.25Z" />
                            </svg>
                            <span className="text-sm md:text-base">Continue with GitHub</span>
                        </Button>
                    </div>

                    <div className="my-4 flex items-center gap-2 sm:gap-4">
                        <hr className="flex-1 border-gray-300" />
                        <p className="text-sm text-muted-foreground text-center">OR</p>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {verified ? (
                        <form onSubmit={otpForm.handleSubmit(verifyOtp)} className="space-y-4 sm:space-y-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    We&apos;ve sent a 6-digit code to {submittedEmail}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="code">Verification Code</Label>
                                <Input
                                    id="code"
                                    placeholder="123456"
                                    {...otpForm.register("code")}
                                    className="bg-secondary text-secondary-foreground"
                                />
                                {otpForm.formState.errors.code && (
                                    <p className="text-sm text-destructive">{otpForm.formState.errors.code.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={otpForm.formState.isSubmitting}
                            >
                                {otpForm.formState.isSubmitting ? <LoaderIcon className="w-4 h-4 animate-spin" /> : "Verify Code"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    {...signUpForm.register("name")}
                                    className="bg-secondary text-secondary-foreground"
                                />
                                {signUpForm.formState.errors.name && (
                                    <p className="text-sm text-destructive">{signUpForm.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    {...signUpForm.register("email")}
                                    className="bg-secondary text-secondary-foreground"
                                />
                                {signUpForm.formState.errors.email && (
                                    <p className="text-sm text-destructive">{signUpForm.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...signUpForm.register("password")}
                                    className="bg-secondary text-secondary-foreground"
                                />
                                {signUpForm.formState.errors.password && (
                                    <p className="text-sm text-destructive">{signUpForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={signUpForm.formState.isSubmitting}
                            >
                                {signUpForm.formState.isSubmitting ? <LoaderIcon className="w-4 h-4 animate-spin" /> : "Continue"}
                            </Button>
                        </form>
                    )}

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
