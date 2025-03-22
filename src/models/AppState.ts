import GameConfig from "./GameConfig";
import GameStats from "./GameStats";
import ScreenType from "./ScreenTypes";

interface AppState {
    currScreen: ScreenType;
    prevGameStat: GameStats | null;
    config: GameConfig;
    isInitialized: boolean,
}

export default AppState;