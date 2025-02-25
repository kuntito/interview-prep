import { Text } from "@chakra-ui/react";
import MobileFrame from "./components/MobileFrame";
import { useState } from "react";
import StartScreen from "./components/screens/StartScreen";
import GamePlayScreen from "./components/screens/GamePlayScreen";
import { GridDim } from "./models/GridDim";
import useNumGridStore from "./state-management/numGridStore";
import { GameConfig } from "./models/GameConfig";

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

    const gridDim: GridDim = { rows: 3, cols: 3 };
    const totalQuestions = 10;
    const config: GameConfig = {
        gridDim: gridDim,
        totalQuestions: totalQuestions,
    };


    const currScreen = () => {
        switch (screenState) {
            case ScreenState.startscreen:
                return <StartScreen onStartGame={onStartGame} />;
            case ScreenState.gameplay:
                return <GamePlayScreen config={config} />;
            case ScreenState.endscreen:
                return <Text>end screen</Text>;
            default:
                return <Text>invalid screen</Text>;
        }
    };

    return <MobileFrame>{currScreen()}</MobileFrame>;
};

export default App;
