import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="">
            <div className="lg:p-8 ">
                <Link href="/" className="absolute top-4 left-4">
                    <Button size="sm" variant="outline">
                        <ArrowLeftIcon className="size-4 mr-1" />
                        Home
                    </Button>
                </Link>
                {children}
            </div>
        </div>
    );
};
