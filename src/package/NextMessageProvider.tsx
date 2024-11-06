'use client';

// ui
import React, { useRef } from 'react';

import {
    MessageBox,
    MessageBoxProps,
    MessageBoxStylingProps
} from '@/package/NextMessage';


export default function NextMessageProvider({
    thread_id,
    domain
}: { thread_id: string; domain: string }) {

    return (
        <form id={'next-chat-provider'}>
            <MessageBox
                thread_id={thread_id}
                domain={domain}
                style={{
                    width: '1150px',
                    height: 'full'
                }}


            />
        </form>
    );
}
