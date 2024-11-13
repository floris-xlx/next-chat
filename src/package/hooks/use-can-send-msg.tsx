// utils
import { countCharacters } from '@/package/utils/utils';
import { useState, useEffect } from 'react';

interface UseCanSendMsgProps {
    textContent: string;
    characterLimit: number;
}

export const useCanSendMsg = ({
    textContent,
    characterLimit
}: UseCanSendMsgProps): { sendingDisabled: boolean } => {
    const [sendingDisabled, setSendingDisabled] = useState(true);

    useEffect(() => {
        const characters = countCharacters(textContent);
        if (characters < 1 || characters > characterLimit) {
            setSendingDisabled(true);
        } else {
            setSendingDisabled(false);
        }
    }, [textContent]);

    return { sendingDisabled };
};
