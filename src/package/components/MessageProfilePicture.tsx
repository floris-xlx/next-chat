import React, { useMemo, FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageProfilePictureProps {
    profile_picture: string | null;
    email: string;
    className?: string;
}

const MessageProfilePicture: FC<MessageProfilePictureProps> = ({
    profile_picture, email, className }) => {
    const avatar_fallback = email?.charAt(0).toUpperCase();
    const renderAvatar = useMemo(() => (
        profile_picture ? (
            <img
                src={profile_picture}
                height={28}
                width={28}
                alt="Profile Picture"
                className='rounded-md select-none mr-2'
                style={{ borderRadius: '6px', height: '28px', width: '28px', marginTop: '5px' }}
            />
        ) : (
            <Avatar className='rounded-md'>
                <AvatarFallback>{avatar_fallback}</AvatarFallback>
            </Avatar>
        )
    ), [profile_picture, avatar_fallback]);

    return (
        <div className={className}>
            {renderAvatar}
        </div>
    );
};

export default MessageProfilePicture;
