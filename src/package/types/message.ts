export interface Message {
    attachments: any[] | null;
    character_count: number;
    content: string;
    created_at: string;
    deleted: boolean;
    domain: string;
    email: string;
    id: number;
    is_reference: boolean;
    mentions: string[];
    message_id: string;
    organization_id: string;
    profile_picture: string | null;
    reactions: any[] | null;
    referenced_message_id: string | null;
    thread_id: string;
    time: number;
    urls: string[];
    user_id: string;
    username: string;
    verified: boolean;
}
