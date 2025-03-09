import { Button, Text } from "@chakra-ui/react";
import useGameScreenStore, { ScreenType } from "../../state-management/gameScreenStore";

const GamePlayScreen = () => {
    const navigateTo = useGameScreenStore((s) => s.navigateTo);
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

export default GamePlayScreen;
