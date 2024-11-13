'use client';

import {
    SendHorizonal,
    Paperclip,
    Smile,
    AtSign,

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


import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';
import { useUserStore, useViewStore } from '@/store/store';

export const MessageActionsBar = ({
    sendingDisabled,
    handleSendClickWrapper

}: {
    sendingDisabled: boolean,
    handleSendClickWrapper: any

}) => {
    const { toast } = useToast();
    const { user } = useUserStore();

    // this would be the form submission



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
    const bgDisabledSendButton = sendingDisabled ? 'bg-transparent' : '';
    const colorIcon = sendingDisabled ? '#acacad' : '#d9d9de';


    const handleSendClick = async () => {
        handleSendClickWrapper();
    } 


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
                                onClick={() => handleSendClick()}
                                size={'icon_small'}
                                className={`rounded-md   ${bgDisabledSendButton}`}
                                type={'button'}
                            //disabled={sendingDisabled}

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