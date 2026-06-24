"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { 
    ListIcon, 
    HouseLineIcon,
    InfoIcon,
    FingerprintSimpleIcon 
} from "@phosphor-icons/react";
import type { Path } from "@components/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import Pic from "@components/image/Pic";

const routes: Path = {
    "display": {
        label: "Display",
        path: "/display",
        icon: HouseLineIcon, // Defaulting icon
    },

    "home": {
        label: "Home",
        path: "/",
        icon: HouseLineIcon,
    }
}

export default function() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    useLayoutEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return (
        <header className="w-full flex flex-wrap items-center justify-between p-7 sticky top-0 left-0 right-0 border-b h-32 bg-foreground">
            <Pic 
                id="logo"
                src="/kirby.gif"
                alt="Logo"
                look="avatar"
                className="rounded-full"
                unoptimized
            />
            {isMobile ? (
                <nav>
                    <Dialog modal={true}>
                    <DialogTrigger>
                        <ListIcon size={32} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Menu</DialogTitle>
                            </DialogHeader>
                            {Object.entries(routes).map(([key, route]) => {
                                const Icon = route.icon;

                                return (
                                    <Link
                                        key={key}
                                        href={route.path}
                                        className={`flex flex-wrap items-center gap-2 ${
                                            pathname === route.path ? "underline text-primary" : ""
                                        }`}
                                    >
                                        {Icon && <Icon size={20} />}
                                        {route.label}
                                    </Link>
                                );
                            })}
                        </DialogContent>
                        </Dialog>
                    </nav>
                ) : (
                    <nav className="flex flex-wrap items-center gap-7">
                        {Object.entries(routes).map(([key, route]) => {
                            const Icon = route.icon;
                            return (
                                <Link
                                    key={key}
                                    href={route.path}
                                    className={`flex flex-wrap items-center gap-2 ${
                                        pathname === route.path ? "underline text-primary" : ""
                                    }`}
                                >
                                    {Icon && <Icon size={20} />}
                                    {route.label}
                                </Link>
                            );
                        })}
                    </nav>
                )}
        </header>
    )
}