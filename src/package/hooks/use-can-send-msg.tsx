// utils
import { countCharacters } from '@/package/utils/utils';
import { useState, useEffect } from 'react';

interface UseCanSendMsgProps {
    textContent: string;
    isTextAreaFocused: boolean;
}

export const useCanSendMsg = ({
    textContent,
    isTextAreaFocused
}: UseCanSendMsgProps): { sendingDisabled: boolean } => {
    const [sendingDisabled, setSendingDisabled] = useState(true);

    useEffect(() => {
        const characters = countCharacters(textContent);
        if (characters < 1 || !isTextAreaFocused) {
            setSendingDisabled(true);
        } else {
            setSendingDisabled(false);
        }
    }, [textContent, isTextAreaFocused]);

    return { sendingDisabled };
};
