'use client';


// ui
import React, { ReactNode, useEffect, useState, Fragment } from 'react'


import {
    MessageBox,
    MessageBoxProps,
    MessageBoxStylingProps
} from '@/package/NextMessage'

import { Input } from '@/components/ui/input'

import { useUserStore } from '@/store/useUserStore'
import { useIsFirstRender } from '@uidotdev/usehooks';

export default function NextMessageProvider({
    thread_id,
    domain
}: { thread_id: string; domain: string }) {

    const isFirstRender = useIsFirstRender();

    console.log('isFirstRenderNextMessageProvider', isFirstRender);
    const parentRef = React.useRef(null);



    return (
        <div>

            <MessageBox
                thread_id={thread_id}
                domain={domain}
                style={{
                    width: '600px',
                    height: '400px'
                }}
                parentRef={parentRef}
                isFirstRender={isFirstRender}


            />

        </div>
    );
}
