'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';

import { addMessage, fetchMessagesByDomainAndThread } from '@/actions/messaging';
import { useToast } from '@/hooks/use-toast';
import { useCanSendMsg } from '@/package/hooks/use-can-send-msg';
import { countCharacters } from '@/package/utils/utils';


import { Textarea } from '@/components/ui/textarea';
import { useUserStore } from '@/store/store';
import MessageActionsBar from '@/package/components/MessageActionsBar';
import handleSendClick from '@/package/interfaces/handleSendClick';


// re-xports
import MessageProfilePicture from '@/package/components/MessageProfilePicture';
import useResizeObservers from '@/package/hooks/use-resize-observers';
import { MessageVirtualizer } from '@/package/components/MessageVirtualizer';


export type MessageBoxProps = {
    thread_id: string;
    domain: string;
    style?: MessageBoxStylingProps;
    allowSelectName?: boolean;
    allowSelectMessage?: boolean;
    placeholderMessage?: string;
    update_interval_in_ms?: number;
};

export type MessageBoxStylingProps = {
    width: string;
    height: string;
    minWidth?: string;
    maxWidth?: string;
    maxHeight?: string;
    minHeight?: string;
};


const MessageBox = ({
    thread_id,
    domain,
    style = { width: '600px', height: '400px' },
    allowSelectName = false,
    allowSelectMessage = false,
    placeholderMessage = 'Write a message...',
    update_interval_in_ms = 1000,
}: MessageBoxProps) => {
    // ref of the virtualization parent
    const parentRef = useRef(null);
    const { toast } = useToast();
    const { user } = useUserStore();
    const [textContent, setTextContent] = useState('');
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    const { sendingDisabled } = useCanSendMsg({
        textContent: textContent,
        isTextAreaFocused: isTextAreaFocused
    });

    // this makes sure msgs are sorted by time
    const sortedMessages = [...messages].sort((a, b) => a.time - b.time);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetchMessagesByDomainAndThread(domain, thread_id, messages.length === 0);
            if (response?.data) {
                setMessages(response.data);
            }
        };
        fetchMessages();
        const interval = setInterval(fetchMessages, update_interval_in_ms);

        return () => clearInterval(interval);
    }, [domain, thread_id, update_interval_in_ms]);




    const handleSendClickWrapper = async (e: any) => {
        e.preventDefault();
        if (parentRef.current) {
            parentRef.current.scrollTo({ top: parentRef.current.scrollHeight, behavior: 'smooth' });
        }

        await handleSendClick(
            e,
            textContent,
            user,
            '', // referencedMessageId placeholder
            countCharacters,
            thread_id,
            domain,
            setTextContent,
            () => {
                if (parentRef.current) {
                    parentRef.current.scrollTo({ top: parentRef.current.scrollHeight, behavior: 'smooth' });
                }
            },
            toast,
            parentRef
        );
    };


    return (
        <Fragment>

            <MessageVirtualizer
                sortedMessages={sortedMessages}
                allowSelectName={allowSelectName}
                parentRef={parentRef}
                style={style}
            />

            <form
                dir="ltr"
                className='w-full border rounded-b-md bg-secondary'
                onClick={handleSendClickWrapper}
            >
                <div>
                    <Textarea
                        placeholder={placeholderMessage}
                        className="bg-transparent w-full border-none ring-0 resize-none p-4 xlx-message-box transform transition-transform duration-150 ease-in-out text-[16px]"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        style={{ resize: 'none', minHeight: '44px', maxHeight: '58px' }}
                        onFocus={() => setIsTextAreaFocused(true)}
                        onBlur={() => setIsTextAreaFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSendClickWrapper(e);

                            }
                        }}
                    />
                </div>
                <MessageActionsBar sendingDisabled={sendingDisabled} />
            </form>

        </Fragment >
    )
};

MessageBox.displayName = 'MessageBox';


export {
    MessageBox as NextMessageBox
};
