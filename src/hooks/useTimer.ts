import { useEffect, useState } from "react";

export const getNowMillis = () => {
    return Math.floor(Date.now());
};

const useTimer = (
    durationMillis: number,
    onTimerEnd: () => void,
    resetKey: number
) => {
    const [timeLeft, setTimeLeft] = useState(durationMillis);

    useEffect(() => {
        setTimeLeft(durationMillis); // restart timer when resetKey changes
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    onTimerEnd();
                    return 0;
                }

                const newTimeMillis = prev - 1000;
                return newTimeMillis;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resetKey]);

    return timeLeft;
};

export default useTimer;
