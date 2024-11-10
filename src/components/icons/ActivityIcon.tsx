
import React from 'react';

const ActivityIcon = (props) => {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            height="16px"
            strokeLinejoin="round"
            width="16px"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M5.51324 3.62367L3.76375 8.34731C3.61845 8.7396 3.24433 8.99999 2.826 8.99999H0.75H0V7.49999H0.75H2.47799L4.56666 1.86057C4.88684 0.996097 6.10683 0.988493 6.43776 1.84891L10.5137 12.4463L12.2408 8.1286C12.3926 7.74894 12.7604 7.49999 13.1693 7.49999H15.25H16V8.99999H15.25H13.5078L11.433 14.1868C11.0954 15.031 9.8976 15.023 9.57122 14.1744L5.51324 3.62367Z" fill="currentColor"></path></svg>
    );
};

export default ActivityIcon;
