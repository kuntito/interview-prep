import ms from "ms";
import { create } from "zustand";

interface TimerState {
    timeLeftMillis: number;
    durationMillis: number;
    isTimeUp: boolean;
}

interface TimerStore {
    state: TimerState;
    beginTimer: (durationMillis: number) => void;
    stopTimer: () => void;
}

const defaultTimerState = {
    timeLeftMillis: 0,
    durationMillis: 0,
    isTimeUp: false,
};

const oneSecondMillis = ms("1s");
const useTimerStore = create<TimerStore>((set) => {
    let intervalId: number | null = null;

    const removeTimerInterval = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    return {
        state: defaultTimerState,
        beginTimer: (durationMillis: number) => {
            // clear existing timer before starting a new one
            removeTimerInterval();

            // starting a new timer
            set((store) => {
                return {
                    state: {
                        ...store.state,
                        timeLeftMillis: durationMillis,
                        durationMillis: durationMillis,
                    },
                };
            });

            // setting up the interval to run every second
            intervalId = setInterval(() => {
                // start the set store here
                set((store) => {
                    const newTimeLeftMillis =
                        store.state.timeLeftMillis - oneSecondMillis;

                    if (newTimeLeftMillis < 0) {
                        removeTimerInterval();
                        return {
                            state: { 
                                ...defaultTimerState,
                                isTimeUp: true
                            },
                        };
                    }

                    // otherwise, update the time left
                    return {
                        state: {
                            ...store.state,
                            timeLeftMillis: newTimeLeftMillis,
                        },
                    };
                });
            }, oneSecondMillis);
        },
        stopTimer: () => {
            removeTimerInterval();
            set((store) => {
                return {
                    state: defaultTimerState,
                };
            });
        },
    };
});

export default useTimerStore;
