import React from "react";

const CrossIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="iconify iconify--lucide"
            width="14"
            height="14"
            viewBox="0 0 24 24"

            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
            ></path>
        </svg>
    )
}

export default CrossIcon;