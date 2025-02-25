import ms from "ms";
import useTimer from "../../hooks/useTimer";
import NumGrid from "../NumGrid";
import ProgressBar from "../ProgressBar";
import TargNumOperatorRow from "../TargNumOperatorRow";
import { GameConfig } from "../../models/GameConfig";
import useNumGridStore from "../../state-management/numGridStore";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";

interface Props {
    config: GameConfig;
}

const GamePlayScreen = ({ config }: Props) => {
    const pos = { ri: 0, ci: 0 };

    const { initState } = useNumGridStore();
    const isInitialized = useNumGridStore((s) => s.state.isInitialized);

    const durationMillis = ms("500s");
    const [timeLeft, restartTimer] = useTimer(durationMillis);

    useEffect(() => {
        initState(config);
    }, []);

    // `fraction` should be the remainder of the time left
    const fraction = timeLeft / durationMillis;
    const screen = isInitialized ? (
        <>
            <ProgressBar fraction={fraction} />
            <TargNumOperatorRow />
            <NumGrid></NumGrid>
        </>
    ) : (
        <Text>nout!</Text>
    );
    return screen;
};

export default GamePlayScreen;
