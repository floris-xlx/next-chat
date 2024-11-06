'use client';

// ui
import React, { useEffect, useRef } from 'react';

import {
    MessageBox,
    MessageBoxProps,
    MessageBoxStylingProps
} from '@/package/NextMessage';

import { useIsFirstRender } from '@uidotdev/usehooks';

// dropzone files
const { Dropzone } = require("dropzone");

export default function NextMessageProvider({
    thread_id,
    domain
}: { thread_id: string; domain: string }) {

    const isFirstRender = useIsFirstRender();

    console.log('isFirstRenderNextMessageProvider', isFirstRender);
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const formElement = document.querySelector("#next-chat-provider");
        if (formElement) {
            const myDropzone = new Dropzone(formElement, {
                url: "/file/upload", // Set the URL for file upload
                autoProcessQueue: false, // Prevent auto-upload
                acceptedFiles: "image/*,application/pdf", // Accept specific file types
                clickable: true, // Make the entire form clickable for file selection
                init: function () {
                    this.on("addedfile", function (file: any) {
                        console.log(`File added: ${file.name}`);
                    });
                }
            });
        }
    }, []);

    return (
        <form id={'next-chat-provider'}  

        >
            
            <MessageBox
                thread_id={thread_id}
                domain={domain}
                style={{
                    width: '390px',
                    height: '400px'
                }}
                parentRef={parentRef}
                isFirstRender={isFirstRender}
            />

        </form>
    );
}
