import { Image, Text, VStack } from "@chakra-ui/react";
import ms from "ms";
import { ReactNode, useEffect } from "react";
import useOverlay from "../../hooks/useOverlay";
import { GameConfig } from "../../models/GameConfig";
import useNumGridStore from "../../state-management/numGridStore";
import useTimerStore from "../../state-management/timerStore";
import NumGrid from "../NumGrid";
import TargNumOperatorRow from "../TargNumOperatorRow";
import TimerComponent from "../TimerComponent";

interface Props {
    config: GameConfig;
    onEndGame: () => void;
}

const GamePlayScreen = ({ config, onEndGame }: Props) => {
    const initState = useNumGridStore((s) => s.initState);
    const initializeGame = useNumGridStore((s) => s.initializeGame);
    const repopulateGrid = useNumGridStore((s) => s.repopulateGrid);

    const isInitialized = useNumGridStore((s) => s.state.isInitialized);
    const { questionDurationMillis, overlayDurationMillis } = config;

    const [overlayState, triggerOverlay] = useOverlay(overlayDurationMillis);
    const isAnswerFound = useNumGridStore((s) => s.state.isAnswerFound);
    const isQuestionLimitReached = useNumGridStore(
        (s) => s.state.isQuestionLimitReached
    );

    const beginTimer = useTimerStore((s) => s.beginTimer);
    const stopTimer = useTimerStore((s) => s.stopTimer);

    useEffect(() => {
        beginTimer(questionDurationMillis);
        return () => stopTimer();
    }, []);

    const showOverlayAndReload = (text: string, children?: ReactNode) => {
        // `setTimeout` prevents the overlay from displaying immediately
        setTimeout(() => {
            stopTimer();
            if (isQuestionLimitReached) {
                triggerOverlay("game end");
                stopTimer();
                setTimeout(() => {
                    onEndGame();
                }, overlayDurationMillis);
            } else {
                triggerOverlay(text, children);
                repopulateGrid();
            }
        }, 500);

        // after overlay ends, start the timer
        setTimeout(() => {
            if (!isQuestionLimitReached) {
                beginTimer(questionDurationMillis);
            }
            return () => stopTimer();
        }, overlayDurationMillis);
    };

    useEffect(() => {
        if (isAnswerFound) {
            showOverlayAndReload(
                "correct!",
                <Image src="public\assets\ic_check.svg" />
            );
        }
    }, [isAnswerFound]);

    useEffect(() => {
        initState(config);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            initializeGame();
        }
    }, [isInitialized]);

    const screen = isInitialized ? (
        <>
            {/* <ScoreAndCount /> */}
            <TimerComponent
                displayOverlay={() =>
                    showOverlayAndReload(
                        "time up!",
                        <VStack>
                            <Image src="public\assets\ic_timer.svg" />
                            <Text fontSize="35px" fontWeight="bold">
                                time up!
                            </Text>
                        </VStack>
                    )
                }
            />
            <VStack height="100%" justifyContent="center" gap="120px">
                <TargNumOperatorRow />
                <NumGrid></NumGrid>
            </VStack>
            {overlayState.component}
        </>
    ) : (
        <Text>nout!</Text>
    );
    return screen;
};

export default GamePlayScreen;

const ScoreAndCount = () => {
    const { score, questionCount: qNum } = useNumGridStore((s) => s.state);

    return (
        <>
            <Text>{`score: ${score}`}</Text>
            <Text>{`num: ${qNum}`}</Text>
        </>
    );
};
