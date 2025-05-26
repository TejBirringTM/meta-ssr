import { create } from "zustand";

type LoadingState = {
    loadingKeys: Record<string, boolean>;
    setLoading: (key: string, isLoading: boolean) => void;
    isLoading: (key?: string) => boolean;
};

export const useLoadingStore = create<LoadingState>((set, get) => ({
    loadingKeys: {},
    setLoading: (key, isLoading) => {
        set((state) => ({
            loadingKeys: { ...state.loadingKeys, [key]: isLoading },
        }));
    },
    isLoading: (key) =>
        key
            ? get().loadingKeys[key]
            : Object.values(get().loadingKeys).some(Boolean),
}));
