-- Schema for next-chat logging and messaging tables.
-- Adjust types as needed before running against your Postgres database.

CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    message_id TEXT,
    thread_id TEXT,
    domain TEXT NOT NULL,
    organization_id TEXT,
    user_id TEXT,
    username TEXT,
    email TEXT,
    profile_picture TEXT,
    content TEXT NOT NULL,
    character_count INTEGER,
    deleted BOOLEAN DEFAULT FALSE,
    is_reference BOOLEAN DEFAULT FALSE,
    referenced_message_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    time BIGINT NOT NULL,
    attachments JSONB,
    reactions JSONB,
    mentions JSONB,
    urls JSONB,
    verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS event_log_users (
    id BIGSERIAL PRIMARY KEY,
    route TEXT NOT NULL,
    status TEXT NOT NULL,
    message TEXT,
    action TEXT,
    user_id TEXT NOT NULL,
    time BIGINT NOT NULL,
    duration DOUBLE PRECISION,
    requested_resource JSONB,
    organization TEXT,
    domain TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_log_auth (
    id BIGSERIAL PRIMARY KEY,
    message TEXT,
    user_id TEXT,
    session_token TEXT,
    time BIGINT NOT NULL,
    route TEXT,
    action TEXT,
    status TEXT,
    ip TEXT DEFAULT 'unknown',
    user_agent TEXT DEFAULT 'unknown',
    browser TEXT,
    os TEXT,
    device TEXT,
    cpu TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_log_users (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT,
    action TEXT,
    message TEXT,
    status TEXT,
    session_token TEXT,
    route TEXT,
    current_view TEXT,
    unix_time BIGINT,
    message_fmt TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

