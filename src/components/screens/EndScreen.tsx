import { Button, Text } from "@chakra-ui/react";
import ScreenType from "../../models/ScreenTypes";
import useAppStore from "../../state-management/appStore";


const EndScreen = () => {
    const navigateTo = useAppStore((s) => s.navigateTo);
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
