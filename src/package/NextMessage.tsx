'use client';

import {
    SendHorizonal,
    Paperclip,
    Smile,
    AtSign,
} from "lucide-react";

import React, { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// actions
import { addMessage, fetchMessagesByDomainAndThread } from '@/actions/messaging';

// utils
import { calculateRelativeTimestamp } from '@/utils/date-utils';
import { wrapText } from '@/package/utils/format-utils';

// zustand
import { useNextMessageStore } from "./store/useNextMessageStore";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUserStore, useViewStore } from '@/store/store';
import { Textarea } from "@/components/ui/textarea";

// event logging
import { addEventLog, EventLogEntry } from '@/actions/event_log';
import { auditLogUser, AuditLogUserEntry } from '@/actions/audit_log';

// ui
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type MessageBoxProps = {
    thread_id: string;
    domain: string;
};

const MessageBox = ({
    thread_id,
    domain
}: MessageBoxProps) => {
    // zustand
    const { toast } = useToast();
    const { nextMessage, setHasMounted } = useNextMessageStore();
    const { user } = useUserStore();

    // usestate
    const [textContent, setTextContent] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    React.useEffect(() => {
        setHasMounted(false);
    }, []);


    const handleAtClick = async () => {
        toast({
            description: 'handleAtClick was clicked',
            variant: 'system',
            duration: 5000
        })
    }

    const handleEmojiClick = async () => {
        toast({
            description: 'handleEmojiClick was clicked',
            variant: 'system',
            duration: 5000
        })
    }

    const handleAttachClick = async () => {
        toast({
            description: 'handleAttachClick was clicked',
            variant: 'system',
            duration: 5000
        })
    }

    const fetchMessages = async () => {
        const response = await fetchMessagesByDomainAndThread(domain, thread_id);
        if (response.success) {

            setMessages(response.data);
        }
    }

    useEffect(() => {
        if (!thread_id || !domain) {
            return;
        }

        fetchMessages();
    }, [textContent]);


    // this would be the form submission
    const handleSendClick = async (e: any) => {
        e.preventDefault();
        if (!textContent.trim()) {
            return;
        }

        const newMessageObject = {
            content: textContent,
            user_id: user?.id,
            organization: user?.organization,
            referenced_message_id: referencedMessageId || null,
            is_reference: !!referencedMessageId,
            character_count: countCharacters(textContent),
            mentions: [], // awaiting implementation
            attachments: [], // awaiting implementation
            reactions: [], // awaiting implementation
            thread_id: thread_id,
            domain: domain,
            profile_picture: user?.profile_picture,
            username: user?.username,
            email: user?.email,
            verified: false
        };

        try {
            const response = await addMessage({ message: newMessageObject });
            if (response.success) {

                setTextContent('');
                setMessages((prevMessages) => [...prevMessages, newMessageObject]);


                // await fetchMessages();
            } else {
                throw new Error(response.error.message);
            }
        } catch (error: any) {
            toast({
                description: `Failed to send message: ${error.message}`,
                variant: 'destructive',
                duration: 5000
            });
        }
    }

    // tooltip texts
    const toolTipTexts = {
        at: 'Mention someone',
        emoji: 'Add emoji',
        attach: 'Attach files',
        send: 'Send'
    }


    const countCharacters = (text: string) => {
        return text.length;
    }

    const [textAreaHeight, setTextAreaHeight] = useState(32 + 32);
    const characterLimit = 1000;
    useEffect(() => {
        const characters = countCharacters(textContent);
        if (characters >= 20) {
            const newHeight = Math.min(160, 64 + Math.ceil((characters / 4) / 16) * 16);
            setTextAreaHeight(newHeight);
        }
    }, [textContent]);





    const [sendingDisabled, setSendingDisabled] = useState(true);

    const classessDisabledCursor = sendingDisabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer';
    const bgDisabledSendButton = sendingDisabled ? 'bg-hover-foreground' : '';
    const colorIcon = sendingDisabled ? '#acacad' : '#d9d9de';

    const placeholderMessage = 'Write a message...';
    const placeholderThreadReply = 'Reply to thread...';

    const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);

    console.log('isTextAreaFocused', isTextAreaFocused);



    // regulates whether the message can be sent if there is no content
    useEffect(() => {
        const characters = countCharacters(textContent);
        if (characters < 1 || isTextAreaFocused === false) {
            setSendingDisabled(true);
        } else {
            setSendingDisabled(false);
        }
    }, [textContent, isTextAreaFocused]);


    // FIXME: awaiting implementation
    const [referencedMessageId, setReferencedMessageId] = useState('');




    const Message = ({
        message
    }: {
        message: any
    }) => {
        // this is the character bound limit to force wrap text
        const [characterWrapLimit, setCharacterWrapLimit] = useState(30);
        const [screenWidth, setScreenWidth] = useState(300);
        const [content, setContent] = useState(message?.content);



        useEffect(() => {
            const handleResize = () => {
                setScreenWidth(window?.innerWidth);
                setCharacterWrapLimit(Math.round(screenWidth / 11));
                setContent(wrapText(message?.content, characterWrapLimit));
            };

            window.addEventListener('resize', handleResize);
            handleResize(); // Call once to set initial value

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [screenWidth]);



        const name = message?.username || message?.email;
        const avatar_fallback = message?.email?.charAt(0).toUpperCase();
        const time = calculateRelativeTimestamp(message?.time, true);


        const renderAvatar = () => {
            if (message?.profile_picture) {
                return (
                    <Image
                        src={message.profile_picture}
                        height={28}
                        width={28}
                        alt="Profile Picture"
                        className='rounded-md'
                        style={{
                            borderRadius: '6px',
                            height: '28px',
                            width: '28px'
                        }}
                    />
                )
            } else {
                return (
                    <Avatar className='rounded-md'>
                        <AvatarFallback>
                            {avatar_fallback}
                        </AvatarFallback>
                    </Avatar>
                )
            }
        }

        return (
            <div className='flex flex-row gap-x-2 max-w-full ' style={{ maxWidth: screenWidth }}>
                {renderAvatar()}

                <div className='pt-[3px]'>
                    <div className='flex flex-row text-center items-center gap-x-1'>
                        <p className='text-[15px] font-[500]'>
                            {name}
                        </p>
                        <p className='text-[13px] font-[300] opacity-50 mt-1'>
                            {time}
                        </p>
                    </div>
                    <p className='text-[14px] font-[400] text-accent opacity-70  text-wrap ' >
                        <span
                            style={{ width: (screenWidth * 0.75) }}
                            className='overflow-x-hidden overflow-ellipsis whitespace-nowrap'
                            dangerouslySetInnerHTML={{
                                __html: content?.replace(/\n/g, "<br />"),
                            }}
                        />
                    </p>
                </div>
            </div>
        )
    }

    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const textAreaRef = useRef(null);

    // Track and restore scroll position on focus
    const handleTextAreaFocus = () => {

        if (chatContainerRef.current) {
            const scrollPosition = chatContainerRef.current.scrollTop;

            setTimeout(() => {
                chatContainerRef.current.scrollTop = scrollPosition;
            }, 0);
        }

        setIsTextAreaFocused(true);
    };


    // Track and restore scroll position on focus or blur
    const restoreScrollPosition = () => {
        if (chatContainerRef.current) {
            const scrollPosition = chatContainerRef.current.scrollTop;

            setTimeout(() => {
                chatContainerRef.current.scrollTop = scrollPosition;
            }, 0);
        }
    };


    const MessageContainer: React.FC<{
        messages?: string[];
    }> = ({ messages = [] }) => {
        // Scroll to the bottom only when new messages are added
        useEffect(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, [messages]);




        return (
            <div
                ref={chatContainerRef}
                className="w-full sm:w-[650px]  border border-b-0 rounded-t-md bg-secondary flex flex-col gap-y-4 p-3"
                style={{ height: '400px', overflowY: 'scroll' }}

            >
                {messages.map((message, index) => (
                    <div key={index} style={{ overflowWrap: 'break-word' }}>
                        <Message key={index} message={message} />
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div id='next-chat-message-box' className='p-0'>
            <MessageContainer messages={messages} />


            <form
                dir="ltr"
                className='w-full sm:max-w-[650px] border rounded-b-md bg-secondary'
                onClick={handleSendClick}
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
                        onBlur={() => {
                            restoreScrollPosition();
                            setIsTextAreaFocused(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSendClick(e);
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className=' p-4 flex flex-row justify-between  '>
                    <TooltipProvider delayDuration={500}>
                        <div className='flex flex-row items-center w-fit'>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant={'icon_naked'}
                                        onClick={handleAtClick}
                                        size={'icon_small'}
                                        className='rounded-md hover:bg-hover-foreground'
                                        type={'button'}
                                    >
                                        <AtSign size={18} className='text-icon' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='p-0 px-1'>
                                    <p className='text-[10px] font-[400]'>{toolTipTexts.at}</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant={'icon_naked'}
                                        onClick={handleEmojiClick}
                                        size={'icon_small'}
                                        className='rounded-md hover:bg-hover-foreground'
                                        type={'button'}
                                    >
                                        <Smile size={18} className='text-icon' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='p-0 px-1'>
                                    <p className='text-[10px] font-[400]'>{toolTipTexts.emoji}</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant={'icon_naked'}
                                        onClick={handleAttachClick}
                                        size={'icon_small'}
                                        className='rounded-md hover:bg-hover-foreground'
                                        type={'button'}
                                    >
                                        <Paperclip size={18} className='text-icon' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='p-0 px-1'>
                                    <p className='text-[10px] font-[400]'>{toolTipTexts.attach}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip>
                                <TooltipTrigger className={classessDisabledCursor}>
                                    <Button
                                        variant={'brand'}
                                        onClick={handleSendClick}
                                        size={'icon_small'}
                                        className={`rounded-md   ${bgDisabledSendButton}`}
                                        type={'button'}
                                        disabled={sendingDisabled}
                                    >
                                        <SendHorizonal size={18} color={colorIcon} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='p-0 px-1'>
                                    <p className='text-[10px] font-[400]'>{toolTipTexts.send}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
            </form >
        </div>
    )
}








export { MessageBox };