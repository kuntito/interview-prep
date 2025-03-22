// it should have a state
// it should have functions to start game and end game
// start timer and end timer?

import generateQuestion from "../functions/generateQuestion";
import GameState from "../models/GameState";
import GridDim from "../models/GridDim";
import OperatorType from "../models/OperatorType";
import QuestionDetails from "../models/QuestionDetails";
import { create } from "zustand";

interface GamePlayStore {
    state: GameState;
    startGame: (gridDim: GridDim) => void;
    stopGame: () => void;
}

const defaultState = {} as GameState;
const emptyQuestion = {
    allNumbers: [],
    correctSelections: [],
    operator: OperatorType.Addition,
    targetNumber: -1,
}

const useGamePlayStore = create<GamePlayStore>((set) => ({
    state: defaultState,
    startGame: (gridDim: GridDim) => {
        set((store) => {
            const tmpQuestion = generateQuestion(gridDim);
            const questionDetails = tmpQuestion ? tmpQuestion : emptyQuestion;
;
            console.log(questionDetails);

            return {
                state: {
                    ...store.state,
                    questionDetails: questionDetails,
                    gridDim: gridDim,
                    isStarted: true
                },
            };
        });
    },
    stopGame: () => {},
}));

export default useGamePlayStore;
