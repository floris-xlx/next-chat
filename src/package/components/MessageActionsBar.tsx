'use client';

import {
    SendHorizonal,
    Paperclip,
    Smile,
    AtSign,
    Reply,
    Trash,
    Pencil,
    Ellipsis
} from "lucide-react";

// ui
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { Fragment, useState, useEffect, useRef } from 'react';

// zustand
import { useNextMessageStore } from "@/package/store/useNextMessageStore";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUserStore, useViewStore } from '@/store/store';
import { Textarea } from "@/components/ui/textarea";

import { scrollFullDown } from '@/package/utils/viewport-utils';
import { addMessage, fetchMessagesByDomainAndThread } from '@/actions/messaging';
import { countCharacters } from '@/package/utils/utils';


export const MessageActionsBar = ({
    sendingDisabled,
    domain,
    textContent,
    referencedMessageId,
    thread_id
}: {
    sendingDisabled: boolean,
    domain: string,
    textContent: string,
    referencedMessageId: string | null,
    thread_id: string
}) => {
    const { toast } = useToast();
    const { user } = useUserStore();

    // this would be the form submission
    const handleSendClick = async (e: any) => {
        e.preventDefault();
        if (!textContent.trim()) { return; }

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
                scrollFullDown();
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
                duration: 2500
            });
        }
    }


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
    // tooltip texts
    const toolTipTexts = {
        at: 'Mention someone',
        emoji: 'Add emoji',
        attach: 'Attach files',
        send: 'Send'
    }


    const classessDisabledCursor = sendingDisabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer';
    const bgDisabledSendButton = sendingDisabled ? 'bg-hover-foreground' : '';
    const colorIcon = sendingDisabled ? '#acacad' : '#d9d9de';


    const placeholderThreadReply = 'Reply to thread...';




    return (
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
        </div>)

}

export default MessageActionsBar;