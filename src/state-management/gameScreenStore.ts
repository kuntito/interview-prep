import { create } from "zustand";

export enum ScreenType {
    start,
    gamePlay,
    end,
}

interface GameScreenStore {
    currScreen: ScreenType;
    navigateTo: (nextScreen: ScreenType) => void;
}

const defaultScreenState = ScreenType.start;

const useGameScreenStore = create<GameScreenStore>((set) => ({
    currScreen: defaultScreenState,
    navigateTo: (nextScreen: ScreenType) => {
        set({ currScreen: nextScreen });
    },
}));

export default useGameScreenStore;
