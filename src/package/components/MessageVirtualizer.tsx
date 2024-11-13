import React, { FC } from 'react';
import MessageProfilePicture from '@/package/components/MessageProfilePicture';
import { calculateRelativeTimestamp } from '@/utils/date-utils';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import useResizeObservers from '@/package/hooks/use-resize-observers';
import { renderImage } from '@/package/render/RenderImage';
import { useUserStore } from '@/store/store';

import { twMerge } from 'tailwind-merge'

// hooks
import { isThisMe } from '@/package/hooks/use-is-this-me';



interface MessageVirtualizerProps {
    sortedMessages: any[];
    allowSelectName: boolean;
    allowSelectMessage: boolean;
    parentRef: React.RefObject<HTMLDivElement>;
    style: {
        maxWidth?: string;
        minWidth?: string;
        maxHeight?: string;
        minHeight?: string;
        width?: string;
        height?: string;
    };
}

const MessageVirtualizer: FC<MessageVirtualizerProps> = ({
    sortedMessages,
    allowSelectName,
    allowSelectMessage,
    parentRef,
    style
}) => {
    const { user } = useUserStore();



    // virtualization controller
    const rowVirtualizer = useVirtualizer({
        count: sortedMessages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
        paddingEnd: 50,
        gap: 5,
    });

    // handles height resizing
    useResizeObservers(rowVirtualizer);




    return (
        <div
            ref={parentRef}
            style={{
                height: style.height || '400px',
                overflow: 'auto',
                maxWidth: style.maxWidth,
                minWidth: style.minWidth,
                maxHeight: style.maxHeight,
                minHeight: style.minHeight,
                width: style.width,
            }}
            className='border rounded-t-md border-b-0'
        >
            <div
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    // this is where scoped logic runs on a message scope basis
                    const item = sortedMessages[virtualRow.index];


                    const mentioned = isThisMe({ message: item, user: user });



                    return (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateY(${virtualRow.start}px)`,
                                overflowWrap: 'break-word',
                                borderLeft: mentioned ? '3px solid hsl(var(--brand-foreground))' : 'none',

                            }}
                        >
                            <div
                                className={twMerge(
                                    'flex flex-col px-4',
                                    mentioned ? 'bg-brand-accent' : 'hover:bg-hover'
                                )}
                                style={{
                                    transform: mentioned ? 'translateX(-3px)' : 'none',
                                    borderLeft: mentioned ? '3px solid hsl(var(--brand-foreground))' : 'none',
                                }}
                            >
                                <div className='flex flex-row gap-2 ' style={{ transform: 'translateY(4px)' }}>
                                    <MessageProfilePicture
                                        profile_picture={item.profile_picture}
                                        email={item.email}
                                    />
                                    <div
                                        className='flex flex-row text-center gap-x-1  max-w-fit '
                                    >
                                        <p
                                            className={`text-[15px] font-[500] ${!allowSelectName ? 'select-none' : ''}`}>
                                            {item.username || item.email}
                                        </p>
                                        <p
                                            className={`text-[13px] font-[300] opacity-50 ${!allowSelectName ? 'select-none' : ''}`}>
                                            {calculateRelativeTimestamp(item.time, true)}
                                        </p>
                                    </div>
                                </div>
                                {/* this renders the actual text, it had to be done like this otherwise it would produce weird artifacts */}
                                <div
                                    className='px-6 text-[14px] font-[400] '
                                    style={{ transform: 'translateY(-8px)', paddingLeft: '37px', userSelect: allowSelectMessage ? 'auto' : 'none' }}
                                >
                                    {item.content}
                                    {item.urls && item.urls.length > 0 && renderImage(item.urls)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { MessageVirtualizer, Virtualizer };
