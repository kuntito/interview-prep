// https://members.codewithmosh.com/courses/ultimate-react-part2-1/lectures/46679158

import { Center, Text, VStack } from "@chakra-ui/react";
import ms from "ms";
import { useEffect, useState } from "react";
import NumGrid, { GridDim } from "./components/NumGrid";
import NumOpComp from "./components/NumOpComp";
import OverlayComponent from "./components/OverlayComponent";
import ProgressBar from "./components/ProgressBar";
import useTimer from "./hooks/useTimer";
import useNumGridStore from "./state-management/numGridStore";

interface OverlayState {
    show: boolean;
    text: string;
}

function App() {
    const dim: GridDim = { rows: 3, cols: 3 };
    const cellSize = 100;

    const { initCells, populateGrid, reset } =
        useNumGridStore();
    const isAnswerFound = useNumGridStore((s) => s.state.isAnswerFound);
    const timerKey = useNumGridStore((s) => s.state.timerKey);

    const overlayDuration = 1000;

    const [overlayState, setOverlay] = useState<OverlayState>({
        show: false,
        text: "",
    });

    const triggerOverlay = (text: string) => {
        setOverlay({ show: true, text });
        console.log(text);

        setTimeout(() => {
            reset();
            setOverlay({ show: false, text: "" });
        }, overlayDuration);
    };

    useEffect(() => {
        initCells(dim);
        populateGrid();
    }, []);

    useEffect(() => {
        if (!isAnswerFound) return;
        triggerOverlay("answer found");
    }, [isAnswerFound]);

    const durationMillis = ms("1000s");
    const onTimerEnd = () => {
        triggerOverlay("time up");
    };

    const timeLeft = useTimer(durationMillis, onTimerEnd, timerKey);
    const fraction = timeLeft / durationMillis;

    return (
        <Center width="100vw" height="100vh" backgroundColor="palette.500">
            <VStack
                width="360px"
                height="640px"
                justifyContent="center"
                borderWidth={2}
                gap="32px"
                // up right down left
                padding="16px 16px 0px 16px"
            >
                <ProgressBar fraction={fraction} />
                {overlayState.show && (
                    <OverlayComponent text={overlayState.text} />
                )}
                <NumOpComp />
                <Center height="100%">
                    <NumGrid cellSize={cellSize} />
                </Center>
            </VStack>
        </Center>
    );
}

export default App;
