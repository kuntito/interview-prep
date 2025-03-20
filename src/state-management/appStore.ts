// this store should navigation, the previous lesson score

import { create } from "zustand";
import GameStats from "../models/GameStats";
import ScreenType from "../models/ScreenTypes";
import GameConfig from "../models/GameConfig";
import AppState from "../models/AppState";

interface AppStore {
    state: AppState;
    initializeGameConfig: (config: GameConfig) => void;
    navigateTo: (nextScreen: ScreenType) => void;
    updateLastGameStat: (lastGameStats: GameStats) => void;
}

const defaultState: AppState = {
    currScreen: ScreenType.start,
    prevGameStat: null,
    config: {} as GameConfig,
};

const useAppStore = create<AppStore>((set) => ({
    state: defaultState,
    initializeGameConfig: (config: GameConfig) => {
        set((store) => {
            return {
                state: {
                    ...store.state,
                    config: config
                }
            }
        })
    },
    navigateTo: (nextScr: ScreenType) => {
        set((store) => {
            return {
                state: {
                    ...store.state,
                    currScreen: nextScr,
                },
            };
        });
    },
    updateLastGameStat: (gameStat: GameStats) => {
        set((store) => {
            return {
                state: {
                    ...store.state,
                    prevGameStat: gameStat,
                },
            };
        });
    },
}));

export default useAppStore;
