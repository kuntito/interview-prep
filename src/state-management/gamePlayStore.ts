// it should have a state
// it should have functions to start game and end game
// start timer and end timer?

import GameState from "../models/GameState";
import QuestionDetails from "../models/QuestionDetails";
import { create } from "zustand";


interface GamePlayStore {
    state: GameState;
    startGame: () => void;
    stopGame: () => void;
    generateQuestion: () => QuestionDetails;
}

const defaultState = {} as GameState;

const useGamePlayStore = create<GamePlayStore>((set) => ({
    state: defaultState,
    startGame: () => {

    },
    stopGame: () => {

    },
    generateQuestion: () => {
        return {} as QuestionDetails
    }
}));