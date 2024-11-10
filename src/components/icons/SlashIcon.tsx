import React from 'react';

const SlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        className="geist-hide-on-mobile"
        data-testid="geist-icon"
        fill="none"
        height="24"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="24"
        style={{ color: 'var(--accent)', width: '28px', height: '28px' }}
        {...props}
    >
        <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
);

export default SlashIcon;
