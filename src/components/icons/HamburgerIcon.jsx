import * as React from 'react';

function HamburgerIcon(props) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="24px"
            strokeLinejoin='round'
            width="32px"
            style={{color: 'currentClor'}}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z" fill="currentColor"></path></svg>
    );
}

export default HamburgerIcon;


