import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// floris: beware how env vars are handled now is UNSAFE,
// in prod you should use a serverless function to handle this

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface MessagePayload {
    new: any; // Replace 'any' with the actual type if known
}

interface AddMessageResponse {
    data: any; // Replace 'any' with the actual type if known
    error: any; // Replace 'any' with the actual type if known
}

export const useMessagesRealtime = (domain: string, threadId: string): any[] => {
    const [messages, setMessages] = useState<any[]>([]);



    useEffect(() => {
        const channelName = 'next-chat-demo'; //`${domain}-${threadId}`;
        console.log('channelName', channelName);
        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `domain=eq.${domain},thread_id=eq.${threadId}`
                },
                (payload: MessagePayload) => {
                    setMessages((prevMessages) => [...prevMessages, payload.new]);
                }
            )
            .subscribe();

        console.log('channel', channel);
        return () => {
            supabase.removeChannel(channel);
        };
    }, [domain, threadId]);

    return messages;
};

export const useAddMessage = (): ((
    domain: string,
    threadId: string,
    content: any
) => Promise<void>) => {

    const addMessageRealtime = async (
        domain: string,
        threadId: string,
        content: any
    ): Promise<void> => {
        const { data, error }: AddMessageResponse = await supabase
            .from('messages')
            .insert([{
                domain,
                thread_id: threadId,
                content
            }]);

        if (error) {
            console.error('Error adding message:', error);
        } else {
            console.log('Message added:', data);
        }
    };

    return addMessageRealtime;
};
