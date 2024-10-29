'use server';

import { createXylexClient } from '@/lib/supabase/client';

export interface AuditLogEntry {
    message: string;
    user_id: string;
    session_token: string | null;
    time: number;
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
    const supabase = createXylexClient();
    const { data, error } = await supabase
        .from('audit_log_auth')
        .insert([
            {
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
                cpu: log.cpu
            }
        ]);

    if (error) {
        console.error('Error adding audit log:', error);
        return { success: false, error };
    }

    return { success: true };
}

export interface AuditLogTradeEntry {
    trade_hash: string;
    time: number;
    action: string;
    route: string;
    message: string;
    new_status: string;
    user_id: string;
    old_trade_status?: string;
    domain?: string;
    organization?: string;
    message_fmt?: string;
    status?: string;
}

export async function auditLogTrade(log: AuditLogTradeEntry) {
    const supabase = createXylexClient();
    const { data, error } = await supabase
        .from('audit_log_trades')
        .insert([
            {
                trade_hash: log.trade_hash,
                time: log.time,
                action: log.action,
                route: log.route,
                user_id: log.user_id,
                status: log.status,
                message: log.message,
                old_trade_status: log.old_trade_status || 'unknown',
                new_trade_status: log.new_status,
                domain: log.domain || 'xylex',
                organization: log.organization,
                message_fmt: log.message_fmt
            }
        ]);

    if (error) {
        console.error('Error adding audit log trade:', error);
        return { data: data, success: false, error };
    }

    return { data: data, success: true };
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

export interface AuditLogPayoneerApiEntry {
    id: string;
    created_at: string;
    time: number;
    user_id: string;
    client_id: string;
    client_secret: string;
    request_hash: string;
    request_id: string;
    ratelimit_remaining: number;
    ratelimit_limit: number;
    ratelimit_reset: number;
    ratelimit_approved: boolean;
    sandbox: boolean;
    production: boolean;
    status: string;
    message: string;
    action: string;
    message_fmt?: string;
    request: string;
    api_host: string;
    route: string;
    session_token: string | null;
    current_view?: string;
    http_status: number;
    response: any;
    scope: string;
}


export async function auditLogUser(log: AuditLogUserEntry, tableName: string = 'audit_log_users') {
    const supabase = createXylexClient();
    const { data, error } = await supabase
        .from(tableName)
        .insert([
            {
                user_id: log.user_id,
                action: log.action,
                message: log.message,
                status: log.status,
                session_token: log.session_token,
                route: log.route,
                current_view: log.current_view,
                unix_time: log.unix_time,
                message_fmt: log.message_fmt
            }
        ]);

    if (error) {
        console.error('Error adding audit log user:', error);
        return { data: data, success: false, error };
    }

    return { data: data, success: true };
}


export async function auditLogPayoneerApi(log: AuditLogPayoneerApiEntry, tableName: string = 'sf_audit_log_payoneer_api') {
    const supabase = createXylexClient();
    const { data, error } = await supabase
        .from(tableName)
        .insert([
            {
                id: log.id,
                created_at: log.created_at,
                time: log.time,
                user_id: log.user_id,
                client_id: log.client_id,
                client_secret: log.client_secret,
                request_hash: log.request_hash,
                request_id: log.request_id,
                ratelimit_remaining: log.ratelimit_remaining,
                ratelimit_limit: log.ratelimit_limit,
                ratelimit_reset: log.ratelimit_reset,
                ratelimit_approved: log.ratelimit_approved,
                sandbox: log.sandbox,
                production: log.production,
                status: log.status,
                message: log.message,
                action: log.action,
                message_fmt: log.message_fmt,
                request: log.request,
                api_host: log.api_host,
                route: log.route,
                session_token: log.session_token,
                current_view: log.current_view,
                http_status: log.http_status,
                response: log.response
            }
        ]);

    if (error) {
        console.error('Error adding audit log payoneer api:', error);
        return { data: data, success: false, error };
    }

    return { data: data, success: true };
}