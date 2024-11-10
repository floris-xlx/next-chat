
import React from 'react';

const FaceNeutralIcon = (props) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            height="24"
            width='24'
            stroke='currentColor'
            strokeLinejoin="round"
            strokeLinecap='round'
            strokeWidth={2}
            style={{ color: "currentcolor" }}
            {...props}
        >
            <circle cx="12" cy="12" r="10"></circle><line x1="8" x2="16" y1="15" y2="15"></line><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
    );
};

export default FaceNeutralIcon;

