import ProgressBar from "./ProgressBar";
import useTimerStore from "../state-management/timerStore";
import { useEffect } from "react";

interface Props {
    displayOverlay: () => void;
}

const TimerComponent = ({ displayOverlay }: Props) => {

    const { timeLeftMillis, durationMillis } = useTimerStore((s) => s.state);
    const isTimeUp = useTimerStore((s) => s.state.isTimeUp);
    

    useEffect(() => {
        if (isTimeUp) {
            displayOverlay();
        }
    }, [isTimeUp]);

    const fraction = timeLeftMillis/durationMillis;
    // console.log(fraction);
    

    return <ProgressBar fraction={fraction} />;
};

export default TimerComponent;