import type { IconProps } from "@phosphor-icons/react"
import type { ReactNode, ForwardRefExoticComponent } from "react"

export type User = {
    id: string;
    name: string;
    identity: string;
}

export type Path = {
    [key: string]: {
        label: string;
        path: string;
        icon?: SVGSVGElement | HTMLImageElement | ReactNode | ForwardRefExoticComponent<IconProps>;
        private: boolean;
    }
}