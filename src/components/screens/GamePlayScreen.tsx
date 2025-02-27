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

const TimerComponent = ({ durationMillis }: { durationMillis: number }) => {
    const [timeLeft, restartTimer] = useTimer(durationMillis);
    const fraction = timeLeft / durationMillis;

    return <ProgressBar fraction={fraction} />;
};

const GamePlayScreen = ({ config }: Props) => {

    const { initState, populateGrid } = useNumGridStore();
    const isInitialized = useNumGridStore((s) => s.state.isInitialized);

    const durationMillis = ms("500s");

    useEffect(() => {
        initState(config);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            populateGrid();
        }
    }, [isInitialized]);

    // `fraction` should be the remainder of the time left
    const screen = isInitialized ? (
        <>
            <TimerComponent durationMillis={durationMillis} />
            <TargNumOperatorRow />
            <NumGrid></NumGrid>
        </>
    ) : (
        <Text>nout!</Text>
    );
    return screen;
};

export default GamePlayScreen;
