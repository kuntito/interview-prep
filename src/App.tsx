import ms from "ms";
import { useEffect } from "react";
import MobileFrame from "./components/MobileFrame";
import GameConfig from "./models/GameConfig";
import GridDim from "./models/GridDim";
import ScreenType from "./models/ScreenTypes";
import useAppStore from "./state-management/appStore";

const App = () => {
    const startScreen = ScreenType.start;
    const gridDim: GridDim = { rows: 3, cols: 3 };
    const totalQuestions = 1;
    const questionDurationMillis = ms("5s");
    const overlayDurationMillis = ms("3s");

    const gameConfig: GameConfig = {
        gridDim: gridDim,
        totalQuestions: totalQuestions,
        questionDurationMillis: questionDurationMillis,
        overlayDurationMillis: overlayDurationMillis,
    }

    const initializeGameConfig = useAppStore(s => s.initializeGameConfig)
    useEffect(() => {
        initializeGameConfig(gameConfig);
        console.log('game initialized');
    }, [])

    return <MobileFrame />;
};

export default App;
