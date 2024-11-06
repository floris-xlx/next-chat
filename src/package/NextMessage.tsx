'use client';

import React, { useState, useEffect, useRef, memo, useMemo, Fragment } from 'react';

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

import MessageActionsBar from '@/package/components/MessageActionsBar';
import handleSendClick from '@/package/interfaces/handleSendClick';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useIsFirstRender } from '@uidotdev/usehooks';
import ResizeObserver from '@juggle/resize-observer';

// re-xports
import MessageProfilePicture from '@/package/components/MessageProfilePicture';

export type MessageBoxProps = {
    thread_id: string;
    domain: string;
    style?: MessageBoxStylingProps;
    allowSelectName?: boolean;
    allowSelectMessage?: boolean;
    placeholderMessage?: string;
    update_interval_in_ms?: number;
    parentRef?: React.RefObject<HTMLDivElement>;
    isFirstRender?: boolean;

};

export type MessageBoxStylingProps = {
    width: string;
    height: string;
};


const MessageBox = ({
    thread_id,
    domain,
    style = { width: '600px', height: '400px' },
    allowSelectName = false,
    allowSelectMessage = false,
    placeholderMessage = 'Write a message...',
    update_interval_in_ms = 1000,
    parentRef = useRef(null),
    isFirstRender = false
}: MessageBoxProps) => {
    const { toast } = useToast();
    const { user } = useUserStore();

    const [textContent, setTextContent] = useState('');
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    console.log('isFirstRender', isFirstRender);

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



    const Message = memo(({ message, id }: { message: any, id: any }) => {
        const { content, username, email, profile_picture, time } = message;




        return (
            <div className='flex flex-row justify-between w-full group ' id={id} style={{
                position: 'absolute', top: '11px', left: '16px', width: '92%', height: `${rowVirtualizer.getVirtualItems().find(v => v.index === id)?.size}px`,
                transform: `translateY(${rowVirtualizer.getVirtualItems().find(v => v.index === id)?.start}px)`
            }}>
                <div className='flex flex-row max-w-full gap-x-2'>
                    <MessageProfilePicture profile_picture={profile_picture} email={email} />

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
                <div className=' px-2 flex flex-row  opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Button variant={'icon_hover'} className='hover:bg-hover bg-transparent transition rounded-md border-0 p-0'>
                        <Reply size={18} className='text-secondary-foreground opacity-80' />
                    </Button>
                </div>
            </div>
        )
    });
    Message.displayName = 'Message';

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

    const resizeObservers = useRef([]);

    const rowVirtualizer = useVirtualizer({
        count: sortedMessages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
        paddingEnd: 50,
    });

    useEffect(() => {
        const virtualItems = rowVirtualizer.getVirtualItems();

        // Clean up old ResizeObservers
        resizeObservers.current.forEach((observer) => observer.disconnect());
        resizeObservers.current = [];

        virtualItems.forEach((virtualItem) => {
            const element = document.querySelector(`[data-index="${virtualItem.index}"]`);

            if (element) {
                const resizeObserver = new window.ResizeObserver(() => {
                    const newSize = element.getBoundingClientRect().height;
                    rowVirtualizer.resizeItem(virtualItem.index, newSize);
                });
                resizeObserver.observe(element);
                resizeObservers.current.push(resizeObserver);
            }
        });

        return () => {
            resizeObservers.current.forEach((observer) => observer.disconnect());
            resizeObservers.current = [];
        };
    }, [rowVirtualizer.getVirtualItems()]);



    return (
        <Fragment>
            <div
                ref={parentRef}
                style={{
                    height: '400px',
                    overflow: 'auto',
                    width: style.width
                }} className='border rounded-t-md border-b-0'>
                <div
                    style={{
                        height: rowVirtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const item = sortedMessages[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${virtualRow.start}px)`,
                                    overflowWrap: 'break-word',
                                    padding: '8x 8px',
                                    paddingLeft: '16px',
                                    paddingTop: '10px',
                                    paddingRight: '16px',
                                }}
                            >
                                <div className='flex flex-row gap-x-2'>
                                    <MessageProfilePicture profile_picture={item.profile_picture} email={item.email} />
                                    <div className='flex flex-row text-center items-center gap-x-1' style={{transform: 'translateY(-3px)'}}>
                                        <p className={`text-[15px] font-[500] ${!allowSelectName ? 'select-none' : ''}`}>{item.username || item.email}</p>
                                        <p className={`text-[13px] font-[300] opacity-50 ${!allowSelectName ? 'select-none' : ''}`}>{calculateRelativeTimestamp(item.time, true)}</p>
                                    </div>
                                </div>
                                <p className='px-6   text-[14px] font-[400]' style={{ transform: 'translateY(-7px)', paddingLeft: '37px' }}>{item.content}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
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
                                e.preventDefault();
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
export { MessageBox };
