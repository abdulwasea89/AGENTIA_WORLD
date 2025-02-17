import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-[#101010] text-foreground font-base antialiased overflow-x-hidden dark",
                    base.variable,
                    heading.variable,
                )}
            >
                <ClerkProvider>
                    <Toaster richColors theme="dark" position="bottom-center" />
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
};
