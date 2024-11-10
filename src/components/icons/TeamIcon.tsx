
import React from 'react';

const TeamIcon = (props) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            height="24px"
            strokeLinejoin="round"
            width="24px"
            stroke="currentColor"
            strokeLinecap='round'
            strokeWidth={1.5}
            {...props}
        >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>
    );
};

export default TeamIcon;


