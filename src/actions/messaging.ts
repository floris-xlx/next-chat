'use server';

import {
    insertIntoAthena,
    fetchFromAthena,
    AthenaFilter,
} from '@/lib/athena/client';

export interface MessageEntry {
    content: string;
    user_id?: string;
    referenced_message_id?: string;
    is_reference?: boolean;
    character_count?: number;
    mentions?: object;
    attachments?: object;
    reactions?: object;
    organization_id?: string;
    thread_id?: string;
    domain: string;
    profile_picture?: string;
    username?: string;
    email?: string;
    verified?: boolean;
    urls?: any;
}

export async function addMessage({ message }: { message: MessageEntry }) {
    const messageData = {
        ...message,
        created_at: new Date().toISOString(),
        time: Math.floor(Date.now() / 1000),
    };

    const { success, error } = await insertIntoAthena({
        table: 'messages',
        schema: 'public',
        insertBody: messageData,
        overrides: {
            organizationId: message.organization_id,
            userId: message.user_id,
        },
    });

    if (!success) {
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
    data: any[] | null;
}> {
    const time = initial_fetch ? 0 : Math.floor(Date.now() / 1000) - 15;

    const filters: AthenaFilter[] = [
        { column: 'domain', value: domain },
        { column: 'thread_id', value: thread_id },
        { column: 'time', operator: 'gte', value: time },
    ];

    const { success, data, error } = await fetchFromAthena({
        table: 'messages',
        schema: 'public',
        limit: 200,
        filters,
        sort: [{ column: 'time', direction: 'asc' }],
    });

    if (!success) {
        console.error('Error fetching messages:', error);
        return { success: false, error, data: null };
    }

    return { success: true, data: data ?? [] };
}
