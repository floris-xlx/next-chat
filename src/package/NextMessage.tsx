'use client';

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import useSWR from 'swr';
import { addMessage, fetchMessagesByDomainAndThread } from '@/actions/messaging';
import { useToast } from '@/hooks/use-toast';
import { useCanSendMsg } from '@/package/hooks/use-can-send-msg';
import { countCharacters } from '@/package/utils/utils';
import { calculateRelativeTimestamp } from '@/utils/date-utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Reply } from "lucide-react";
import { useUserStore } from '@/store/store';
import { useNextMessageStore } from "./store/useNextMessageStore";
import MessageActionsBar from '@/package/components/MessageActionsBar';
import handleSendClick from '@/package/interfaces/handleSendClick';
import { useVirtualizer } from '@tanstack/react-virtual';

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
};

const fetcher = async (domain: string, thread_id: string) => {
    const response = await fetchMessagesByDomainAndThread(domain, thread_id, true);
    return response?.data;
};

const MessageBox = ({
    thread_id,
    domain,
    style = { width: '600px', height: '400px' },
    allowSelectName = false,
    allowSelectMessage = false,
    placeholderMessage = 'Write a message...',
    update_interval_in_ms = 5000
}: MessageBoxProps) => {
    const { toast } = useToast();

    const { user } = useUserStore();

    const [textContent, setTextContent] = useState('');
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const { sendingDisabled } = useCanSendMsg({
        textContent: textContent,
        isTextAreaFocused: isTextAreaFocused
    });



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

    const parentRef = useRef(null);
    const rowVirtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 62,
        overscan: 5,
    });

    const Message = memo(({ message, id }: { message: any, id: any }) => {
        const { content, username, email, profile_picture, time } = message;
        const avatar_fallback = email?.charAt(0).toUpperCase();
        const renderAvatar = useMemo(() => (
            profile_picture ? (
                <img
                    src={profile_picture}
                    height={28}
                    width={28}
                    alt="Profile Picture"
                    className='rounded-md select-none mr-2'
                    style={{ borderRadius: '6px', height: '28px', width: '28px', marginTop: '5px' }}
                />
            ) : (
                <Avatar className='rounded-md'>
                    <AvatarFallback>{avatar_fallback}</AvatarFallback>
                </Avatar>
            )
        ), [profile_picture, avatar_fallback]);

        return (
            <div className='flex flex-row justify-between w-full group' id={id} style={{ position: 'absolute', top: 0, left: '14px', width: '95%', overflowX: 'hidden', height: `${rowVirtualizer.getVirtualItems().find(v => v.index === id)?.size}px`, transform: `translateY(${rowVirtualizer.getVirtualItems().find(v => v.index === id)?.start}px)` }}>
                <div className='flex flex-row max-w-full gap-x-2 '>
                    {renderAvatar}
                    <div className='pl-2'>
                        <div className='flex flex-row text-center items-center gap-x-1'>
                            <p className={`text-[15px] font-[500] ${!allowSelectName ? 'select-none' : ''}`}>{username || email}</p>
                            <p className={`text-[13px] font-[300] opacity-50 ${!allowSelectName ? 'select-none' : ''}`}>{calculateRelativeTimestamp(time, true)}</p>
                        </div>
                        <p className='text-[14px] font-[400] text-accent opacity-70 text-wrap'>
                            <span
                                style={{ wordBreak: 'break-word', overflowWrap: 'break-word', overflowX: 'hidden' }}
                                className={`${!allowSelectMessage ? 'select-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: content?.replace(/\n/g, "<br />") }}
                            />
                        </p>
                    </div>
                </div>
                <div className='flex flex-row items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Button variant={'icon_hover'} className='hover:bg-hover bg-transparent transition rounded-md border-0 p-2'>
                        <Reply size={18} className='text-secondary-foreground opacity-80' />
                    </Button>
                </div>
            </div>
        )
    });
    Message.displayName = 'Message';

    const handleSendClickWrapper = async (e: any) => {
        e.preventDefault();
        await handleSendClick(
            e,
            textContent,
            user,
            '', // referencedMessageId placeholder
            countCharacters,
            thread_id,
            domain,
            setTextContent,
            () => console.log(';'), // Clear messages temporarily after sending
            toast,
            chatContainerRef
        );
    };

    return (
        <div id='next-chat-message-box' style={{ width: style.width, height: style.height }} >
            <div ref={parentRef} className='border border-b-0 rounded-t-md bg-secondary' style={{ height: '400px', width: '100%', overflow: 'auto' }}>
                <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <Message id={virtualRow.index} key={virtualRow.index} message={messages[virtualRow.index]} />
                    ))}
                </div>
            </div>
            <form dir="ltr" className='w-full border rounded-b-md bg-secondary' onClick={handleSendClickWrapper}>
                <div>
                    <Textarea
                        placeholder={placeholderMessage}
                        className="bg-transparent w-full border-none ring-0 resize-none p-4 xlx-message-box transform transition-transform duration-150 ease-in-out text-[16px]"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        style={{ resize: 'none', minHeight: '64px' }}
                        onFocus={() => setIsTextAreaFocused(true)}
                        onBlur={() => setIsTextAreaFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSendClickWrapper(e);
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
                <MessageActionsBar sendingDisabled={sendingDisabled} />
            </form>
        </div>
    )
};

MessageBox.displayName = 'MessageBox';
export { MessageBox };
