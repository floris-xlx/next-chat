// utils
import { countCharacters } from '@/package/utils/utils';
import { useState, useEffect } from 'react';

interface UseCanSendMsgProps {
    textContent: string;
    isTextAreaFocused: boolean;
    characterLimit: number;
}

export const useCanSendMsg = ({
    textContent,
    isTextAreaFocused,
    characterLimit
}: UseCanSendMsgProps): { sendingDisabled: boolean } => {
    const [sendingDisabled, setSendingDisabled] = useState(true);

    useEffect(() => {
        const characters = countCharacters(textContent);
        if (characters < 1 || !isTextAreaFocused || characters > characterLimit) {
            setSendingDisabled(true);
        } else {
            setSendingDisabled(false);
        }
    }, [textContent, isTextAreaFocused]);

    return { sendingDisabled };
};
