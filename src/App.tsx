import { Text } from "@chakra-ui/react";
import MobileFrame from "./components/MobileFrame";
import { useState } from "react";
import StartScreen from "./components/screens/StartScreen";
import GamePlayScreen from "./components/screens/GamePlayScreen";

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

    const currScreen = () => {
        switch (screenState) {
            case ScreenState.startscreen:
                return <StartScreen onStartGame={onStartGame} />;
            case ScreenState.gameplay:
                return <GamePlayScreen/>;
            case ScreenState.endscreen:
                return <Text>end screen</Text>;
            default:
                return <Text>invalid screen</Text>;
        }
    };

    return <MobileFrame>{currScreen()}</MobileFrame>;
};

export default App;
