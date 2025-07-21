import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      isOpen: false,
      messages: [],
      setIsOpen: (val) => set({ isOpen: val }),
      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),
      clearChat: () => set({ messages: [] }),
    }),
    { name: "chat-store" }
  )
);
