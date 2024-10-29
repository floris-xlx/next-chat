import { createBrowserClient } from "@supabase/ssr";

export function createXylexClient() {
    return createBrowserClient(
        process.env.SUPABASE_URL_XYLEX!,
        process.env.SUPABASE_ANON_KEY_XYLEX!
    );
}