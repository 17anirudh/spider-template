"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { styleMap, sizesMap } from "./definitions";
import type { LoadingImageProps, StaticImageProps } from "./definitions";

export function PixelatedLoadingImage({ id, src, alt, look, className, onLoad, ...props }: LoadingImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { containerStyle, imageStyle } = styleMap[look];
    return (
        <figure
            id={id}
            role="img"
            aria-label={alt}
            aria-busy={!isLoaded}
            className={cn("m-0 p-0", containerStyle)}
        >
            {/* Announces load transition to screen readers */}
            <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {isLoaded ? `Loaded: ${alt}` : `Loading: ${alt}`}
            </span>
            <Image
                {...props}
                src={src}
                alt=""
                fill
                sizes={sizesMap[look]}
                onLoad={(e) => {
                    setIsLoaded(true);
                    onLoad?.(e);
                }}
                className={cn(
                    imageStyle,
                    "transition-[filter,transform] duration-700 ease-out will-change-[filter,transform]",
                    isLoaded ? "blur-none scale-100" : "blur-2xl scale-110",
                    className
                )}
            />
        </figure>
    );
}

export function SkeletonLoadingImage({ id, src, alt, look, className, onLoad, ...props }: LoadingImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { containerStyle, imageStyle } = styleMap[look];

    return (
        <figure
            id={id}
            role="img"
            aria-label={alt}
            aria-busy={!isLoaded}
            className={cn(
                "m-0 p-0",
                containerStyle,
                !isLoaded && "animate-pulse bg-muted"
            )}
        >
            {/* Announces load transition to screen readers */}
            <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {isLoaded ? `Loaded: ${alt}` : `Loading: ${alt}`}
            </span>
            <Image
                {...props}
                src={src}
                alt="" // suppressed — figure's aria-label is the accessible name
                fill
                sizes={sizesMap[look]}
                onLoad={(e) => {
                    setIsLoaded(true);
                    onLoad?.(e);
                }}
                className={cn(
                    imageStyle,
                    "transition-opacity duration-500",
                    isLoaded ? "opacity-100" : "opacity-0",
                    className
                )}
            />
        </figure>
    );
}

export function StaticImage({ id, src, alt, width, height, className, ...props }: StaticImageProps) {
    return (
        <figure
            id={id}
            role="img"
            aria-label={alt}
            className="m-0 p-0 inline-flex"
        >
            <Image
                {...props}
                src={src}
                alt=""
                width={width}
                height={height}
                className={cn("block", className)}
            />
        </figure>
    );
}