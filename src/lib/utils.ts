
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function cx(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isDev() {
    return process.env.NODE_ENV === "development"
}

export function formatName(name: string) {
    if (!name) return ""

    return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const focusRing = [
    // base  
    "outline outline-offset-2 outline-0 focus-visible:outline-2",
    // outline color  
    "outline-blue-500 dark:outline-blue-500",
]

export function roundingListBoxItems(items) {
    if (!items || !items.length) return [];

    return items.map((item, index) => {
        let className;
        if (items.length === 1) {
            className = 'rounded-top-md rounded-bottom-md';
        } else if (index === 0) {
            className = 'rounded-none rounded-top-md';
        } else if (index === items.length - 1) {
            className = 'rounded-none rounded-bottom-md';
        }
        return {
            ...item,
            className: className || item.className
        };
    });
}