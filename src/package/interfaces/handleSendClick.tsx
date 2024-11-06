'use client';



import React from 'react';


import { addMessage } from '@/actions/messaging';
import { scrollFullDown } from '@/package/utils/viewport-utils';
import { countCharacters, extractUrls, identifyUrlType } from '@/package/utils/utils';
import { removeUrls } from '@/package/utils/clean-utils';

const handleSendClick = async (
    e: any,
    textContent?: string,
    user?: any,
    referencedMessageId?: string,
    thread_id?: string,
    domain?: string,
    setTextContent?: React.Dispatch<React.SetStateAction<string>>,
    toast?: any,
    containerRef?: React.RefObject<HTMLDivElement>,
) => {
    e.preventDefault();
    if (!textContent.trim()) { return; }

    const urls = extractUrls(textContent);
    const urlTypes = urls.map((url: string) => identifyUrlType(url));
    const cleanText = removeUrls(textContent);
    console.log('cleanText', cleanText);
    console.log('textContent', textContent);

    const newMessageObject = {
        content: cleanText,
        user_id: user?.id,
        organization: user?.organization,
        referenced_message_id: referencedMessageId || null,
        is_reference: !!referencedMessageId,
        character_count: countCharacters(cleanText),
        thread_id: thread_id,
        domain: domain,
        profile_picture: user?.profile_picture,
        username: user?.username,
        email: user?.email,
        verified: false,
        urls: urlTypes
    };

    try {
        const response = await addMessage({ message: newMessageObject });
        if (response.success) {
            scrollFullDown(containerRef);
            setTextContent('');

            // floris; temp removed the client-only ghost message for now
            // setMessages((prevMessages) => [...prevMessages, newMessageObject]);
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
};

export default handleSendClick;
