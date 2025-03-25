import { create } from "zustand";
import CellModel from "../models/CellModel";
import GameState from "../models/GameState";
import GridDim from "../models/GridDim";
import useTimerStore from "./timerStore";
import generateQuestion from "../functions/generateQuestion";
import generateCellGrid from "../functions/generateCellGrid";
import placeNumbersInGrid from "../functions/placeNumbersInGrid";
import GameEndStatus from "../models/GameEndStatus";

interface GamePlayStore {
    state: GameState;
    startGame: (
        gridDim: GridDim,
        durationMillis: number,
        overlayDurationMillis: number
    ) => void;
    setQuestions: () => void;
    stopGame: () => void;
    onCellClick: (cell: CellModel) => void;
}

const defaultState = {} as GameState;

const useGamePlayStore = create<GamePlayStore>((set) => {
    const timerStore = useTimerStore.getState();

    const onTimeUp = () => {
        // set game end status to time up
        console.log("on time up called");

        set((store) => {
            const { qCount, totalQuestions } = store.state;
            const isTotalQuestionReached = qCount === totalQuestions;
            return {
                state: {
                    ...store.state,
                    endStatus: isTotalQuestionReached
                        ? GameEndStatus.GameOver
                        : GameEndStatus.TimeUp,
                },
            };
        });
    };

    // after a question ends i.e. time up / answer correct
    // either state would be indicated by `state.gameEndStatus`
    // there should be a function that generates a new question

    const startGame = (
        gridDim: GridDim,
        durationMillis: number,
        totalQuestions: number
    ) => {
        timerStore.beginTimer(durationMillis, onTimeUp);

        const question = generateQuestion(gridDim);

        // place numbers on the grid
        const grid = generateCellGrid(gridDim);
        placeNumbersInGrid(grid, question.allNumbers);

        set((store) => {
            return {
                state: {
                    ...store.state,
                    questionDetails: question,
                    isStarted: true,
                    currentSelections: [],
                    grid: grid,
                    gridDim: gridDim,
                    endStatus: undefined,
                    qCount: 1,
                    totalQuestions: totalQuestions,
                    questionDurationMillis: durationMillis,
                },
            };
        });
    };

    const setQuestions = () => {
        set((store) => {
            if (
                !store.state.isStarted ||
                store.state.qCount === store.state.totalQuestions
            ) {
                return { state: store.state };
            }

            const { questionDurationMillis, gridDim } = store.state;

            // start timer
            timerStore.beginTimer(questionDurationMillis, onTimeUp);

            // get new question:
            const question = generateQuestion(gridDim);

            // place numbers on the grid
            const grid = generateCellGrid(gridDim);
            placeNumbersInGrid(grid, question.allNumbers);

            const qCount = store.state.qCount + 1;
            const isTotalQuestionReached =
                qCount === store.state.totalQuestions;
            // set game state
            return {
                state: {
                    ...store.state,
                    questionDetails: question,
                    currentSelections: [],
                    grid: grid,
                    qCount: qCount,
                    endStatus: isTotalQuestionReached
                        ? GameEndStatus.GameOver
                        : undefined,
                },
            };
        });
    };

    const stopGame = () => {
        // stop timer
    };

    const onCellClick = (cell: CellModel) => {
        set((store) => {
            // if question is answered i.e. `endStatus` has a value,
            // no cell should be clickable
            if (store.state.endStatus) {
                return { state: store.state };
            }

            const { ri, ci } = cell.pos;
            console.log(`cell (${ri},${ci}) clicked`);

            const maxSelectableCells = 2;
            const currentSelections = [...store.state.currentSelections];

            // if cell already selected, remove from selections
            if (currentSelections.includes(cell)) {
                const idx = currentSelections.findIndex((cm) => cm === cell);
                currentSelections.splice(idx, 1);
            } else {
                // make room by removing last added cell
                if (currentSelections.length === maxSelectableCells) {
                    currentSelections.pop();
                }
                currentSelections.push(cell);
            }

            const correctSelections =
                store.state.questionDetails.correctSelections;
            if (checkForAnswer(currentSelections, correctSelections)) {
                console.log("answer found");
                timerStore.stopTimer();
                return {
                    state: {
                        ...store.state,
                        currentSelections: currentSelections,
                        endStatus: GameEndStatus.CorrectAnswer,
                    },
                };
            }

            return {
                state: {
                    ...store.state,
                    currentSelections: currentSelections,
                },
            };
        });
    };

    return {
        state: defaultState,
        startGame: startGame,
        setQuestions: setQuestions,
        stopGame: stopGame,
        onCellClick: onCellClick,
    };
});

export default useGamePlayStore;

const checkForAnswer = (
    currentSelectedCells: CellModel[],
    correctSelections: number[]
) => {
    const currSelections = currentSelectedCells.map((c) => c.num);

    currSelections.sort();
    correctSelections.sort();

    return currSelections.toString() === correctSelections.toString();
};
