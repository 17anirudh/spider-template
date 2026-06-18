"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { PixelatedLoadingImage } from "./image/Component";
import { 
    ListIcon, 
    HouseLineIcon,
    InfoIcon,
    FingerprintSimpleIcon,
    NuclearPlantIcon 
} from "@phosphor-icons/react";
import type { Path } from "@/lib/paths";

const routes: Path = {
    "home": {
        label: "Home",
        path: "/",
        icon: HouseLineIcon,
        private: false
    },
    "about": {
        label: "About",
        path: "/about",
        icon: InfoIcon,
        private: false
    },
    "auth": {
        label: "Auth",
        path: "/auth",
        icon: FingerprintSimpleIcon,
        private: false
    }
}

const publicRoutes = Object.entries(routes).filter(([_, route]) => !route.private);
const privateRoutes = Object.entries(routes).filter(([_, route]) => route.private);
const publicRouteKeys = ["/dashboard"]

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    
    useLayoutEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return (
        <header>
            <NuclearPlantIcon size={72} color="#ca2c21" weight="fill" />
            <div>
                {isMobile ? (
                    <>
                        <button><ListIcon size={32} weight="bold" /></button>
                        <nav>
                            {}
                        </nav>
                    </>
                ) : (
                    <div>
                        {}
                    </div>
                )}
            </div>
        </header>
    )
}