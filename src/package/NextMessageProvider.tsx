'use client';

// ui
import React, { useRef } from 'react';

import {
    NextMessageBox,

} from '@/package/NextMessage';


export default function NextMessageProvider({
    thread_id,
    domain
}: { thread_id: string; domain: string }) {

    return (
        <form id={'next-chat-provider'}>
            <NextMessageBox
                thread_id={thread_id}
                domain={domain}
                style={{
                    width: '1150px',
                    height: '600px',
                    maxWidth: '650px',
                }}


            />
        </form>
    );
}
