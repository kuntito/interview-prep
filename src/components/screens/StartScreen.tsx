import { Button } from "@chakra-ui/react";
import useGameScreenStore, {
    ScreenType,
} from "../../state-management/gameScreenStore";

const StartScreen = () => {
    const navigateTo = useGameScreenStore((s) => s.navigateTo);
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
