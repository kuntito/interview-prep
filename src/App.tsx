import { Text } from "@chakra-ui/react";
import ms from "ms";
import { useState } from "react";
import MobileFrame from "./components/MobileFrame";
import EndScreen from "./components/screens/EndScreen";
import GamePlayScreen from "./components/screens/GamePlayScreen";
import StartScreen from "./components/screens/StartScreen";
import { GameConfig } from "./models/GameConfig";
import { GridDim } from "./models/GridDim";

enum ScreenState {
    startscreen,
    gameplay,
    endscreen,
}

const App = () => {
    const [screenState, setScreenState] = useState(ScreenState.gameplay);

    const onStartGame = () => {
        setScreenState(ScreenState.gameplay);
    };

    const onEndGame = () => {
        setScreenState(ScreenState.endscreen);
    }

    const gridDim: GridDim = { rows: 3, cols: 3 };
    const totalQuestions = 3;
    const config: GameConfig = {
        gridDim: gridDim,
        totalQuestions: totalQuestions,
        questionDurationMillis: ms("5s"),
        overlayDurationMillis: ms("3s"),
    };

    const currScreen = () => {
        switch (screenState) {
            case ScreenState.startscreen:
                return <StartScreen onStartGame={onStartGame} />;
            case ScreenState.gameplay:
                return <GamePlayScreen config={config} onEndGame={onEndGame}/>;
            case ScreenState.endscreen:
                return <EndScreen/>;
            default:
                return <Text>invalid screen</Text>;
        }
    };

    return <MobileFrame>{currScreen()}</MobileFrame>;
};

export default App;
