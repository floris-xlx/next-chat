'use server';

import { createXylexClient } from '@/lib/supabase/client';

export interface MessageEntry {
    content: string;
    user_id?: string;
    referenced_message_id?: string;
    is_reference?: boolean;
    character_count?: number;
    mentions?: object;
    attachments?: object;
    reactions?: object;
    organization?: string;
    thread_id?: string;
    domain: string;
    profile_picture?: string;
    username?: string;
    email?: string;
    verified?: boolean;
    urls?: any;
}

export async function addMessage({ message }: { message: MessageEntry }) {
    const xylexClient = createXylexClient();

    const messageData = {
        ...message,
        created_at: new Date().toISOString(),
        time: Math.floor(Date.now() / 1000),
    };

    const { error } = await xylexClient
        .from('messages')
        .insert([messageData]);

    if (error) {
        console.error('Error inserting message:', error);
        return { success: false, error };
    }

    return { success: true };
}


export async function fetchMessagesByDomainAndThread(
    domain: string,
    thread_id: string,
    initial_fetch = false
): Promise<{
    success: boolean;
    error?: any;
    data: any[] | null,
}> {
    const xylexClient = createXylexClient();

    const time = initial_fetch ? 0 : Math.floor(Date.now() / 1000) - 15;

    const { data, error } = await xylexClient
        .from('messages')
        .select('*')
        .gte('time', time)
        .eq('domain', domain)
        .eq('thread_id', thread_id);

    if (error) {
        console.error('Error fetching messages:', error);
        return { success: false, error, data: null };
    }

    return { success: true, data: data as any[] };
}
