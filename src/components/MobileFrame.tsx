import { Center, Text, VStack } from "@chakra-ui/react";

import StartScreen from "./screens/StartScreen";
import GamePlayScreen from "./screens/GamePlayScreen";
import EndScreen from "./screens/EndScreen";
import useAppStore from "../state-management/appStore";
import ScreenType from "../models/ScreenTypes";

const renderScreen = (screen: ScreenType) => {
    switch (screen) {
        case ScreenType.start:
            return <StartScreen />;
        case ScreenType.gamePlay:
            return <GamePlayScreen />;
        case ScreenType.end:
            return <EndScreen />;
        default:
            return <Text>nout!</Text>;
    }
};

const MobileFrame = () => {
    const currentScreen = useAppStore((s) => s.state.currScreen);

    return (
        <Center width="100vw" height="100vh" backgroundColor="palette.500">
            <VStack
                width="360px"
                height="640px"
                justifyContent="center"
                borderWidth={2}
                gap="32px"
                // up right down left
                padding="16px 16px 0px 16px"
            >
                {renderScreen(currentScreen)}
            </VStack>
        </Center>
    );
};

export default MobileFrame;
