'use client';


import React, { Fragment, useState, useEffect, useRef } from 'react';
// actions
import { addMessage, fetchMessagesByDomainAndThread } from '@/actions/messaging';
//hooks
import { useToast } from '@/hooks/use-toast';
import { useCanSendMsg } from '@/package/hooks/use-can-send-msg';
import { useIsFirstRender } from "@uidotdev/usehooks";
// interfaces
import handleSendClick from '@/package/interfaces/handleSendClick';
import MessageActionsBar from '@/package/components/MessageActionsBar';
// utils
import { countCharacters } from '@/package/utils/utils';
import { calculateRelativeTimestamp } from '@/utils/date-utils';
import { restoreScrollPosition, scrollFullDown } from '@/package/utils/viewport-utils';
// ui
import { Reply } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// store
import { useUserStore } from '@/store/store';
import { useNextMessageStore } from "./store/useNextMessageStore";


export type MessageBoxProps = {
    thread_id: string;
    domain: string;
    style?: MessageBoxStylingProps;
    allowSelectName?: boolean;
    allowSelectMessage?: boolean;
    placeholderMessage?: string;
    avatar?: React.ReactNode;
    update_interval_in_ms?: number;
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
    avatar,
    update_interval_in_ms = 1000
}: MessageBoxProps) => {
    // zustand
    const { toast } = useToast();
    const { nextMessage, setHasMounted } = useNextMessageStore();
    const { user } = useUserStore();

    // usestate
    const [textContent, setTextContent] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);

    const [referencedMessageId, setReferencedMessageId] = useState('');

    const [messageCountOld, setMessageCountOld] = useState(0);
    const [messageCountNew, setMessageCountNew] = useState(0);

    console.log('messageCountOld', messageCountOld);
    console.log('messageCountNew', messageCountNew);

    // responsible for disabling the send button
    const { sendingDisabled } = useCanSendMsg({
        textContent: textContent,
        isTextAreaFocused: isTextAreaFocused
    });

    console.log('old messages', messages);
    
    const [initialFetched, setInitialFetched] = useState(false);


    const fetchMessages = async () => {
        let response;

        if (messages.length === 0 && !initialFetched) {
            response = await fetchMessagesByDomainAndThread(domain, thread_id, true);
            setInitialFetched(true);

            // Set old message count before updating messages
            setMessageCountOld(response?.data?.length);

        } else {
            response = await fetchMessagesByDomainAndThread(domain, thread_id, false);


        }

        if (response?.data?.length > 0) {
            console.log('response with fetch', response);
            console.log('new messages', response?.data);



            // Update messages
            setMessages(response?.data);

            // Once messages are updated, use the new length to set the new count
            setMessageCountNew(response?.data.length);

            // Log the counts for comparison
            console.log('Updated messageCountOld:', messages.length);
            console.log('Updated messageCountNew:', response?.data.length);
        }
    };


    useEffect(() => {
        if (!thread_id || !domain) { return; }
        fetchMessages();
    }, [thread_id, domain]);



    // this is for the message update interval
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, update_interval_in_ms);

        return () => clearInterval(interval);
    }, [update_interval_in_ms]);




    const [textAreaHeight, setTextAreaHeight] = useState(32 + 32);

    // this is for the textarea height adjustment
    useEffect(() => {
        const characters = countCharacters(textContent);
        if (characters >= 20) {
            const newHeight = Math.min(160, 64 + Math.ceil((characters / 4) / 16) * 12);
            setTextAreaHeight(newHeight);
        }
    }, [textContent]);

    const Message = React.memo(({
        message,
        id = 'message-id'
    }: {
        message: any,
        id?: string
    }) => {
        // this is the character bound limit to force wrap text

        const content = message?.content;
        const name = message?.username || message?.email;
        const avatar_fallback = message?.email?.charAt(0).toUpperCase();
        const time = calculateRelativeTimestamp(message?.time, true);

        const renderAvatar: React.JSX.Element = React.useMemo(() => {
            if (message?.profile_picture) {
                // using normal <img> as the next one keeps re-rendering?!
                return (
                    <img
                        src={message.profile_picture}
                        height={28}
                        width={28}
                        alt="Profile Picture"
                        className='rounded-md select-none mr-2'
                        style={{
                            borderRadius: '6px',
                            height: '28px',
                            width: '28px',
                            marginTop: '5px',
                        }}
                    />
                );
            } else {
                return (
                    <Avatar className='rounded-md'>
                        <AvatarFallback>
                            {avatar_fallback}
                        </AvatarFallback>
                    </Avatar>
                );
            }
        }, [message?.profile_picture, avatar_fallback]);


        return (
            <div id={id} className='flex flex-row justify-between  w-full group'>
                <div className='flex flex-row max-w-full gap-x-2' >
                    {renderAvatar}
                    <div className='pl-2'>
                        <div className='flex flex-row text-center items-center gap-x-1'>
                            <p className={`text-[15px] font-[500] ${!allowSelectName ? 'select-none' : ''}`} >
                                {name}
                            </p>
                            <p className={`text-[13px] font-[300] opacity-50  ${!allowSelectName ? 'select-none' : ''}`} >
                                {time}
                            </p>
                        </div>
                        <p className='text-[14px] font-[400] text-accent opacity-70 text-wrap'>
                            <span
                                style={{ wordBreak: 'break-word', overflowWrap: 'break-word', overflowX: 'hidden' }}
                                className={` ${!allowSelectMessage ? 'select-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: content?.replace(/\n/g, "<br />") }}
                            />
                        </p>
                    </div>
                </div>

                <div className='flex flex-row items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Button variant={'icon_hover'} className='hover:bg-hover bg-transparent transition rounded-md border-0 p-2 '>
                        <Reply size={18} className='text-secondary-foreground opacity-80' />
                    </Button>
                </div>
            </div>
        )
    });

    Message.displayName = 'Message';

    const chatContainerRef = useRef<HTMLDivElement>(null);




    // Handle focus/blur events
    const handleTextAreaFocus = () => {
        setIsTextAreaFocused(true);
    };

    const handleTextAreaBlur = () => {
        setIsTextAreaFocused(false);
    };

    const ScrollContainer: React.FC<{
        children: React.ReactNode
    }> = ({
        children
    }) => {
            const outerDiv = useRef(null);
            const innerDiv = useRef(null);

            const prevInnerDivHeight = useRef(null);
            const [autoScroll, setAutoScroll] = useState(true);

            useEffect(() => {
                const outerDivHeight = outerDiv.current.clientHeight;
                const innerDivHeight = innerDiv.current.clientHeight;
                const outerDivScrollTop = outerDiv.current.scrollTop;

                // Check if user is already at or near bottom
                if (autoScroll || outerDivScrollTop >= prevInnerDivHeight.current - outerDivHeight - 20) {
                    outerDiv.current.scrollTo({
                        top: innerDivHeight! - outerDivHeight!,
                        left: 0,
                        behavior: prevInnerDivHeight.current ? "smooth" : "auto"
                    });
                    setAutoScroll(true);
                }

                prevInnerDivHeight.current = innerDivHeight;
            }, [children, autoScroll]);

            const handleUserScroll = () => {
                const outerDivHeight = outerDiv.current.clientHeight;
                const innerDivHeight = innerDiv.current.clientHeight;
                const outerDivScrollTop = outerDiv.current.scrollTop;

                // If user scrolls up, disable auto scroll
                if (outerDivScrollTop < innerDivHeight - outerDivHeight - 20) {
                    setAutoScroll(false);
                } else {
                    setAutoScroll(true);
                }
            };

            return (
                <div
                    style={{
                        position: "relative",
                        height: "100%"
                    }}
                >
                    <div
                        ref={outerDiv}
                        style={{
                            position: "relative",
                            height: "100%",
                            overflowY: "scroll"
                        }}
                        onScroll={handleUserScroll}
                    >
                        <div
                            ref={innerDiv}
                            style={{
                                position: "relative"
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            )
        };


    // Handle click wrapper
    const HandleClickWrapper = async (e: any) => {
        e.preventDefault();
        console.log('clicked HandleClickWrapper', e);
        await handleSendClick(
            e,
            textContent,
            user,
            referencedMessageId,
            countCharacters,
            thread_id,
            domain,
            setTextContent,
            setMessages,
            toast,
            chatContainerRef
        );
    };

    const MessageContainer: React.FC<{ messages?: any[] }> = ({ messages = [] }) => {
        return (
            <div style={{ height: '400px' }} className='border border-b-0 rounded-t-md bg-secondary'>
                <ScrollContainer>
                    <div className=" flex flex-col gap-y-4 p-3">
                        {messages.map((message, index) => (
                            <div key={index} style={{ overflowWrap: 'break-word' }}>
                                <Message
                                    key={index}
                                    id={message?.message_id}
                                    message={message}
                                />
                            </div>
                        ))}
                    </div>
                </ScrollContainer>
            </div>
        );
    };


    return (
        <div id='next-chat-message-box'
            style={{
                width: style.width,
                height: style.height
            }}
        >
            <MessageContainer messages={messages} />

            <form
                dir="ltr"
                className='w-full  border rounded-b-md bg-secondary'
                onClick={HandleClickWrapper}
            >
                <div>
                    <Textarea
                        placeholder={placeholderMessage}
                        className="bg-transparent w-full border-none ring-0 resize-none p-4 xlx-message-box transform transition-transform duration-150 ease-in-out text-[16px]"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        style={{
                            resize: 'none',
                            height: textAreaHeight + 'px',
                            minHeight: textAreaHeight + 'px',
                        }}
                        onFocus={handleTextAreaFocus}
                        onBlur={() => handleTextAreaBlur()}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                HandleClickWrapper(e);
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <MessageActionsBar
                    sendingDisabled={sendingDisabled}
                    domain={domain}
                    textContent={textContent}
                    referencedMessageId={referencedMessageId}
                    thread_id={thread_id}
                />

            </form >
        </div >
    )
}


// display name for message
MessageBox.displayName = 'MessageBox';

export { MessageBox };