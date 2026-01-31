'use server';

import { insertIntoAthena } from '@/lib/athena/client';

export interface AuditLogEntry {
    message: string;
    user_id: string;
    session_token: string | null;
    route: string;
    action: string;
    status: string;
    ip?: string;
    user_agent?: string;
    browser?: string;
    os?: string;
    device?: string;
    cpu?: string;
}

export async function auditLog(log: AuditLogEntry) {
    const { success, error } = await insertIntoAthena({
        table: 'audit_log_auth',
        schema: 'public',
        insertBody: {
            message: log.message,
            user_id: log.user_id,
            session_token: log.session_token,
            time: Math.floor(Date.now() / 1000),
            route: log.route,
            action: log.action,
            status: log.status,
            ip: log.ip || 'unknown',
            user_agent: log.user_agent || 'unknown',
            browser: log.browser,
            os: log.os,
            device: log.device,
            cpu: log.cpu,
        },
        overrides: {
            userId: log.user_id,
        },
    });

    if (!success) {
        console.error('Error adding audit log:', error);
        return { success: false, error };
    }

    return { success: true };
}

export interface AuditLogUserEntry {
    user_id: string;
    action: string;
    message: string;
    status: string;
    session_token: string | null;
    route: string;
    current_view?: string;
    unix_time: number;
    message_fmt?: string;
}

export async function auditLogUser(
    log: AuditLogUserEntry,
    tableName: string = 'audit_log_users'
) {
    const { success, data, error } = await insertIntoAthena({
        table: tableName,
        schema: 'public',
        insertBody: {
            user_id: log.user_id,
            action: log.action,
            message: log.message,
            status: log.status,
            session_token: log.session_token,
            route: log.route,
            current_view: log.current_view,
            unix_time: log.unix_time,
            message_fmt: log.message_fmt,
        },
        overrides: {
            userId: log.user_id,
        },
    });

    if (!success) {
        console.error('Error adding audit log user:', error);
        return { data, success: false, error };
    }

    return { data, success: true };
}
