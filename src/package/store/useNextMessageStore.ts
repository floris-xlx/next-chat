import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface NextMessageStore {
    nextMessage: {
        hasMounted: boolean;
    };
    setHasMounted: (hasMounted: boolean) => void;
}

export const useNextMessageStore = create<NextMessageStore>()(
    persist(
        (set) => ({
            nextMessage: {
                hasMounted: false,
            },
            setHasMounted: (hasMounted: boolean) => set((state) => ({
                nextMessage: { ...state.nextMessage, hasMounted }
            })),
        }),
        {
            name: 'next-message-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
