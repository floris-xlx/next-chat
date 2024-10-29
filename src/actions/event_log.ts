'use server';

import { createXylexClient } from '@/lib/supabase/client';

export interface EventLogEntry {
    route: string;
    status: string;
    message: string;
    action: string;
    user_id: string;
    time: number;
    duration: number;
    requested_resource: object;
    organization: string;
    domain: string;
}

export async function addEventLog(eventLog: EventLogEntry) {
    const xylexClient = createXylexClient();

    const { error } = await xylexClient
        .from('event_log_users')
        .insert([eventLog]);

    if (error) {
        console.error('Error inserting event log:', error);
        return { success: false, error };
    }

    return { success: true };
}
