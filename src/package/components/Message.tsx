import React from 'react';

import { calculateRelativeTimestamp } from '@/utils/date-utils';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton';

const MessageComponent = ({
    message,
    id = 'message-id'
}: {
    message: any,
    id?: string
}) => {
    const content = message?.content;
    const name = message?.username || message?.email;
    const avatar_fallback = message?.email?.charAt(0).toUpperCase();
    const time = calculateRelativeTimestamp(message?.time, true);

    const renderAvatar: React.JSX.Element = React.useMemo(() => {
        if (message?.profile_picture) {
            return (
                <img
                    src={message.profile_picture}
                    height={28}
                    width={28}
                    alt="Profile Picture"
                    className='rounded-md select-none mr-2'
                    style={{
                        borderRadius: '6px',
                        height: '28px',
                        width: '28px',
                        marginTop: '5px',
                    }}
                />
            );
        } else {
            return (
                <Avatar className='rounded-md'>
                    <AvatarFallback>
                        {avatar_fallback}
                    </AvatarFallback>
                </Avatar>
            );
        }
    }, [message?.profile_picture, avatar_fallback]);

    return (
        <div id={id}>
            {renderAvatar}
            <div>
                <div>{name}</div>
                <div>{content}</div>
                <div>{time}</div>
            </div>
        </div>
    );
};

MessageComponent.displayName = 'Message';

export const Message = React.memo(MessageComponent);

export const MessageLoading = () => {
    return (
        <div>
            <Skeleton
                className='rounded-md select-none mr-2'
                style={{
                    borderRadius: '6px',
                    height: '28px',
                    width: '28px',
                    marginTop: '5px'
                }} />
            <div>
                <Skeleton className='w-[100px] h-[20px]' />
                <Skeleton className='w-[100px] h-[20px]' />
                <Skeleton className='w-[100px] h-[20px]' />
            </div>
        </div>
    );
};
