'use server';

import { insertIntoAthena } from '@/lib/athena/client';

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
    const { success, error } = await insertIntoAthena({
        table: 'event_log_users',
        schema: 'public',
        insertBody: eventLog,
        overrides: {
            organizationId: eventLog.organization,
            userId: eventLog.user_id,
        },
    });

    if (!success) {
        console.error('Error inserting event log:', error);
        return { success: false, error };
    }

    return { success: true };
}
