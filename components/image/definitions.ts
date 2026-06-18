import { type ImageProps } from "next/image";

type Look =
    | "default"       // 16:9   – cards, editorial
    | "avatar"        // 1:1 rounded-full – profiles
    | "banner"        // 21:9  – cinematic headers
    | "full-width"    // 2:1   – hero sections
    | "full-height"   // inherits parent height – full-bleed panels
    | "square"        // 1:1 sharp – product images, thumbnails
    | "portrait";     // 3:4   – book covers, posters, story cards

type Override = "src" | "alt" | "sizes" | "className" | "fill" | "width" | "height"

type StyleEntry = { containerStyle: string; imageStyle: string; }

interface LoadingImageProps extends Omit<ImageProps, Override> {
    id: string;
    src: string;
    alt: string;
    look: Look;
    className?: string;
}

interface StaticImageProps extends LoadingImageProps {
    width: number;
    height: number;
    className?: string;
}

const styleMap: Record<Look, StyleEntry> = {
    default: {
        containerStyle: "relative w-full aspect-video overflow-hidden",
        imageStyle: "object-cover",
    },
    avatar: {
        containerStyle: "relative aspect-square rounded-full overflow-hidden shrink-0",
        imageStyle: "object-cover",
    },
    banner: {
        containerStyle: "relative w-full aspect-[21/9] overflow-hidden",
        imageStyle: "object-cover",
    },
    "full-width": {
        containerStyle: "relative w-full aspect-[2/1] overflow-hidden",
        imageStyle: "object-cover",
    },
    "full-height": {
        containerStyle: "relative w-full h-full overflow-hidden",
        imageStyle: "object-cover",
    },
    square: {
        containerStyle: "relative aspect-square overflow-hidden",
        imageStyle: "object-cover",
    },
    portrait: {
        containerStyle: "relative w-full aspect-[3/4] overflow-hidden",
        imageStyle: "object-cover",
    },
};

const sizesMap: Record<Look, string> = {
    default:       "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    avatar:        "(max-width: 640px) 64px, 96px",
    banner:        "100vw",
    "full-width":  "100vw",
    "full-height": "(max-width: 640px) 100vw, 50vw",
    square:        "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
    portrait:      "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
};

export { styleMap, sizesMap }
export type { LoadingImageProps, StaticImageProps }