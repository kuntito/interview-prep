import { Button, Text, VStack } from "@chakra-ui/react";
import useAppStore from "../../../state-management/appStore";
import ScreenType from "../../../models/ScreenTypes";
import TargetAndOperand from "./TargetAndOperand";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import { useEffect } from "react";
import NumGrid from "./NumGrid";

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
    const gridDim = useAppStore(s => s.state.config.gridDim);

    useEffect(() => {
        startGame(gridDim);
    }, [])

    return isStarted ? (
        <>
            <VStack height="100%" justifyContent="center" gap="120px">
                <TargetAndOperand />
                <NumGrid />
            </VStack>
        </>
    ) : "";
};

export default GamePlayScreen;
