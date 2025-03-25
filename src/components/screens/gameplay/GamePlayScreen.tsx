import { Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import ScreenType from "../../../models/ScreenTypes";
import useAppStore from "../../../state-management/appStore";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import NumGrid from "./NumGrid";
import NumGridOverlay from "./NumGridOverlay";
import TargetAndOperand from "./TargetAndOperand";
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
    const { setQuestions, startGame } = useGamePlayStore();
    const isStarted = useGamePlayStore((s) => s.state.isStarted);
    const { gridDim, questionDurationMillis, totalQuestions } = useAppStore(
        (s) => s.state.config
    );

    useEffect(() => {
        startGame(gridDim, questionDurationMillis, totalQuestions);
    }, []);

    const beforeDismissOverlay = () => {
        setQuestions();
    };

    const onGameOver = () => {};

    const num = useGamePlayStore((s) => s.state.qCount);
    return isStarted ? (
        <>
            <VStack height="100%" justify="space-around" spacing={4}>
                <VStack gap={10} width={"100%"}>
                    <Text>{num}</Text>
                    <TimerComponent />
                    <TargetAndOperand />
                </VStack>
                <NumGrid />
                <NumGridOverlay
                    beforeDismissOverlay={beforeDismissOverlay}
                    onGameOver={onGameOver}
                />
            </VStack>
        </>
    ) : (
        ""
    );
};

export default GamePlayScreen;
