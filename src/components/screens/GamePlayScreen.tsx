import { Button, Text } from "@chakra-ui/react";
import useAppStore from "../../state-management/appStore";
import ScreenType from "../../models/ScreenTypes";


const GamePlayScreen = () => {
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

export default GamePlayScreen;
