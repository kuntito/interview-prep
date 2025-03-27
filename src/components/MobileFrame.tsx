import { Center, HStack, Text, VStack } from "@chakra-ui/react";

import StartScreen from "./screens/start/StartScreen";
import GamePlayScreen from "./screens/gameplay/GamePlayScreen";
import EndScreen from "./screens/EndScreen";
import useAppStore from "../state-management/appStore";
import ScreenType from "../models/ScreenTypes";
import EndGameButton from "./EndGameButton";
import EndGameDialog from "./EndGameDialog";

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
    const { currScreen, displayCloseButton } = useAppStore((s) => s.state);
    const isGameInitialized = useAppStore((s) => s.state.isInitialized);

    return isGameInitialized ? (
        <Center width="100vw" height="100vh" backgroundColor="palette.500">
            <VStack width="360px" height="640px" borderWidth={2}>
                {displayCloseButton && (
                    <HStack width={"100%"} justifyContent={"end"} padding={"4px 4px 0px 0px"}>
                        <EndGameButton />
                    </HStack>
                )}
                <VStack
                    justifyContent="center"
                    gap="32px"
                    // up right down left
                    padding="16px 16px 0px 16px"
                    height={"100%"}
                    width={"100%"}
                >
                    {renderScreen(currScreen)}
                </VStack>
            </VStack>
            <EndGameDialog isOpen={true} onClose={() => {}} />
        </Center>
    ) : (
        ""
    );
};

export default MobileFrame;
