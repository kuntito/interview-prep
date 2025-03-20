import { create } from "zustand";
import ScreenType from "../models/ScreenTypes";


interface NavigationStore {
    currScreen: ScreenType;
    navigateTo: (nextScreen: ScreenType) => void;
}

const defaultScreenState = ScreenType.start;

const useGameScreenStore = create<NavigationStore>((set) => ({
    currScreen: defaultScreenState,
    navigateTo: (nextScreen: ScreenType) => {
        set({ currScreen: nextScreen });
    },
}));

export default useGameScreenStore;
