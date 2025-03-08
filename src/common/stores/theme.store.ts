import { create } from 'zustand';

interface ThemeState {
  showSidebar: boolean;
}

interface ThemeActions {
  changeSidebarView: (shouldShow: boolean) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()((set) => ({
  // Initial state
  showSidebar: true,

  // Actions
  changeSidebarView: (shouldShow: boolean) => {
    if (shouldShow) {
      set({ showSidebar: true });
    } else {
      set({ showSidebar: false });
    }
  },
}));
