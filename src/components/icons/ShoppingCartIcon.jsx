import * as React from "react";

function ShoppingCartIcon(props) {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M192 416 A16 16 0 0 1 176 432 A16 16 0 0 1 160 416 A16 16 0 0 1 192 416 z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M416 416 A16 16 0 0 1 400 432 A16 16 0 0 1 384 416 A16 16 0 0 1 416 416 z"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M48 80h64l48 272h256"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
            />
        </svg>
    );
}

export default ShoppingCartIcon;