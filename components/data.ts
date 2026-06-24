import type { Icon } from "@phosphor-icons/react";

export type Path = {
    [key: string]: {
        label: string;
        path: string;
        icon?: Icon;
    };
};