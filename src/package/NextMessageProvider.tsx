'use client';

// ui
import React, { useRef } from 'react';

import {
    MessageBox,
    MessageBoxProps,
    MessageBoxStylingProps
} from '@/package/NextMessage';

import { useIsFirstRender } from '@uidotdev/usehooks';

export default function NextMessageProvider({
    thread_id,
    domain
}: { thread_id: string; domain: string }) {

    const isFirstRender = useIsFirstRender();

    console.log('isFirstRenderNextMessageProvider', isFirstRender);
    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <form id={'next-chat-provider'}>
            <MessageBox
                thread_id={thread_id}
                domain={domain}
                style={{
                    width: '500px',
                    height: '400px'
                }}
                parentRef={parentRef}
                isFirstRender={isFirstRender}
            />
        </form>
    );
}
