import { useUserStore } from '@/store/store';
import { Message } from '@/package/types/message';

export const useIsThisMe = (
    messages: Message[]
) => {
    const { user } = useUserStore();

    // if no messages or user, return false
    if (!messages || !user?.id) return false;

    // check if any messages mention the user
    return messages.some((message: Message) =>
        message.mentions && message.mentions.includes(user.id)
    );
};
