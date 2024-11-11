import React, { FC } from 'react';
import MessageProfilePicture from '@/package/components/MessageProfilePicture';
import { calculateRelativeTimestamp } from '@/utils/date-utils';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import useResizeObservers from '@/package/hooks/use-resize-observers';
import { renderImage } from '@/package/render/RenderImage';




interface MessageVirtualizerProps {
    sortedMessages: any[];
    allowSelectName: boolean;
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
    parentRef,
    style
}) => {
    // virtualization controller
    const rowVirtualizer = useVirtualizer({
        count: sortedMessages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
        paddingEnd: 50,
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
                    const item = sortedMessages[virtualRow.index];


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
                                padding: '8x 8px',
                                paddingLeft: '16px',
                                paddingTop: '10px',
                                paddingRight: '16px',
                            }}
                            className='bg-transparent bg-hover'
                        >
                            <div className='flex flex-row '>

                                <MessageProfilePicture
                                    profile_picture={item.profile_picture}
                                    email={item.email}
                                />

                                <div
                                    className='flex flex-row text-center items-center gap-x-1  max-w-fit'
                                    style={{ transform: 'translateY(-3px)' }}>
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
                                style={{ transform: 'translateY(-7px)', paddingLeft: '37px' }}
                            >
                                {item.content}
                                {item.urls && item.urls.length > 0 && renderImage(item.urls)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { MessageVirtualizer, Virtualizer };
