import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NextChat {
  currently_spotlight: boolean;
  spotlight_url: string;
  attachments_url_list: string[] | null;
  images_blurred: boolean;
}

interface NextChatStore {
  nextChat: NextChat;

  // Spotlight actions
  setCurrentlySpotlight: (currently_spotlight: boolean) => void;
  setSpotlightUrl: (spotlight_url: string) => void;

  // image actions
  setImagesBlurred: (blurred: boolean) => void;

  // Attachments actions
  setAttachmentsUrlList: (attachments_url_list: string[]) => void;
  clearAttachmentsUrlList: () => void;
  addAttachmentUrl: (url: string) => void;
  removeAttachmentUrl: (url: string) => void;
}

export const useNextChatStore = create<NextChatStore>()(
  persist(
    (set) => {
      return {
        nextChat: {
          currently_spotlight: false,
          spotlight_url: "",
          attachments_url_list: null as string[] | null,
          images_blurred: false,
        },

        // Spotlight actions
        setCurrentlySpotlight: (currently_spotlight: boolean) =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              currently_spotlight,
            },
          })),

        setSpotlightUrl: (spotlight_url: string) =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              spotlight_url,
            },
          })),

        // Image actions
        setImagesBlurred: (blurred: boolean) =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              images_blurred: blurred,
            },
          })),

        // Attachments actions
        setAttachmentsUrlList: (attachments_url_list: string[]) =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              attachments_url_list,
            },
          })),

        clearAttachmentsUrlList: () =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              attachments_url_list: [],
            },
          })),

        addAttachmentUrl: (url: string) =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              attachments_url_list: [
                ...(state.nextChat.attachments_url_list || []),
                url,
              ],
            },
          })),

        removeAttachmentUrl: (url: string) =>
          set((state) => ({
            nextChat: {
              ...state.nextChat,
              attachments_url_list: state.nextChat.attachments_url_list
                ? state.nextChat.attachments_url_list.filter(
                    (item) => item !== url
                  )
                : [],
            },
          })),
      };
    },
    {
      name: "next-chat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helper object for direct access to state and actions
export const nextChat = {
  get currently_spotlight() {
    return useNextChatStore.getState().nextChat.currently_spotlight;
  },
  get spotlight_url() {
    return useNextChatStore.getState().nextChat.spotlight_url;
  },
  get attachments_url_list() {
    return useNextChatStore.getState().nextChat.attachments_url_list;
  },
  get images_blurred() {
    return useNextChatStore.getState().nextChat.images_blurred;
  },
  setCurrentlySpotlight(value: boolean) {
    return useNextChatStore.getState().setCurrentlySpotlight(value);
  },
  setSpotlightUrl(value: string) {
    return useNextChatStore.getState().setSpotlightUrl(value);
  },
  setImagesBlurred(value: boolean) {
    return useNextChatStore.getState().setImagesBlurred(value);
  },
  setAttachmentsUrlList(value: string[]) {
    return useNextChatStore.getState().setAttachmentsUrlList(value);
  },
  clearAttachmentsUrlList() {
    return useNextChatStore.getState().clearAttachmentsUrlList();
  },
  addAttachmentUrl(url: string) {
    return useNextChatStore.getState().addAttachmentUrl(url);
  },
  removeAttachmentUrl(url: string) {
    return useNextChatStore.getState().removeAttachmentUrl(url);
  },
};
