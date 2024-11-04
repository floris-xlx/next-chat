export const scrollFullDown = (chatContainerRef: React.RefObject<HTMLDivElement>) => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;
    }
};



// Track and restore scroll position on focus or blur
export const restoreScrollPosition = ({
    containerRef
}: {
    containerRef: React.RefObject<HTMLDivElement>
}) => {
    if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;

        setTimeout(() => {
            containerRef.current.scrollTop = scrollPosition;
        }, 0);
    }
};