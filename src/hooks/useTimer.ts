import { useEffect, useState } from "react";

const useTimer = (
    durationMillis: number,
    onTimerEnd: () => void = () => {}
) => {
    
    const [timeLeft, setTimeLeft] = useState(durationMillis);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeMillis) => {
                if (prevTimeMillis <= 0) {
                    clearInterval(interval);
                    onTimerEnd();
                    return 0;
                }
    
                const newTimeMillis = prevTimeMillis - 1000;
                return newTimeMillis;
            });
        }, 1000);

        // Cleanup on unmount or state change
        return () => clearInterval(interval);
    }, [durationMillis]);

    const restartTimer = () => {
        setTimeLeft(durationMillis);
    }

    return [timeLeft, restartTimer] as const;
};

export default useTimer;