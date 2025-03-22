import useTimerStore from "../../../../state-management/timerStore";
import ProgressBar from "./ProgressBar";


const TimerComponent = () => {

    const { timeLeftMillis, durationMillis } = useTimerStore((s) => s.state);
    const isTimeUp = useTimerStore((s) => s.state.isTimeUp);
    

    const fraction = timeLeftMillis/durationMillis;
    // console.log(fraction);
    

    return <ProgressBar fraction={fraction} />;
};

export default TimerComponent;