import { Button } from "@chakra-ui/react";
import useAppStore from "../../../state-management/appStore";
import ScreenType from "../../../models/ScreenTypes";

const StartScreen = () => {
    const navigateTo = useAppStore((s) => s.navigateTo);
    return (
        <Button
            background="palette.100"
            onClick={() => {
                navigateTo(ScreenType.gamePlay);
            }}
        >
            start game
        </Button>
    );
};

export default StartScreen;
