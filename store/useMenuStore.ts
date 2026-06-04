import { create } from "zustand";

type MenuStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleOpen: () => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  open: false,

  setOpen: (value) => set({ open: value }),

  toggleOpen: () =>
    set((state) => ({ open: !state.open })),
}));