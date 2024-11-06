import { useEffect, useRef } from 'react';

// temp ANY type
const useResizeObservers = (rowVirtualizer: any) => {
    const resizeObservers = useRef([]);

    useEffect(() => {
        const virtualItems = rowVirtualizer.getVirtualItems();

        // Clean up old ResizeObservers
        resizeObservers.current.forEach((observer) => observer.disconnect());
        resizeObservers.current = [];

        // temp ANY type
        virtualItems.forEach((virtualItem: any) => {
            const element = document.querySelector(`[data-index="${virtualItem.index}"]`);

            if (element) {
                const resizeObserver = new window.ResizeObserver(() => {
                    const newSize = element.getBoundingClientRect().height;
                    rowVirtualizer.resizeItem(virtualItem.index, newSize);
                });
                resizeObserver.observe(element);
                resizeObservers.current.push(resizeObserver);
            }
        });

        return () => {
            resizeObservers.current.forEach((observer) => observer.disconnect());
            resizeObservers.current = [];
        };
    }, [rowVirtualizer.getVirtualItems()]);
};

export default useResizeObservers;
