import { useUserStore } from '@/store/store';
import { Message } from '@/package/types/message';

export const isThisMe = function ({ message, user }: { message: Message, user: any }) {

    // if no message or user, return false
    if (!message || !user?.id) return false;

    // check if the message mentions the user
    return message.mentions && message.mentions.includes(user.id);
};
