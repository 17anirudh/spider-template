import type { Icon } from "@phosphor-icons/react"

export type User = {
    id: string;
    name: string;
    identity: string;
}

export type Path = {
    [key: string]: {
        label: string;
        path: string;
        icon?: Icon;
    }
}