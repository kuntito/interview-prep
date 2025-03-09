import { Button, Text } from "@chakra-ui/react";
import useGameScreenStore, { ScreenType } from "../../state-management/gameScreenStore";



const EndScreen = () => {
    const navigateTo = useGameScreenStore(s => s.navigateTo);
    return (
        <>
            <Text>end screen!</Text>
            <Button
                background="palette.100"
                onClick={() => {
                    navigateTo(ScreenType.start);
                }}
            >
                go to start
            </Button>
        </>
    );
};

export default EndScreen;
