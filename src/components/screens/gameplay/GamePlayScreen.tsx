import { Button, Text, VStack } from "@chakra-ui/react";
import useAppStore from "../../../state-management/appStore";
import ScreenType from "../../../models/ScreenTypes";
import TargetAndOperand from "./TargetAndOperand";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import { useEffect } from "react";
import NumGrid from "./NumGrid";
import NumGridOverlay from "./NumGridOverlay";
import TimerComponent from "./timer/TimerComponent";

const placeHolder = () => {
    const navigateTo = useAppStore((s) => s.navigateTo);
    return (
        <>
            <Text>game play!</Text>
            <Button
                background="palette.100"
                onClick={() => {
                    navigateTo(ScreenType.end);
                }}
            >
                go to end screen
            </Button>
        </>
    );
};

const GamePlayScreen = () => {

    const startGame = useGamePlayStore(s => s.startGame);
    const isStarted = useGamePlayStore(s => s.state.isStarted);
    const { gridDim, questionDurationMillis, overlayDurationMillis } = useAppStore(s => s.state.config);

    useEffect(() => {
        startGame(gridDim, questionDurationMillis, overlayDurationMillis);
    }, [])

    return isStarted ? (
        <>
            <VStack height="100%" justifyContent="center" gap="120px">
                <TimerComponent />
                <TargetAndOperand />
                <NumGrid />
                <NumGridOverlay />
            </VStack>
        </>
    ) : "";
};

export default GamePlayScreen;
