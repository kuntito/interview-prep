// it should have a state
// it should have functions to start game and end game
// start timer and end timer?

import { grid, position } from "@chakra-ui/react";
import generateQuestion from "../functions/generateQuestion";
import CellModel from "../models/CellModel";
import GameState from "../models/GameState";
import GridDim from "../models/GridDim";
import OperatorType from "../models/OperatorType";
import QuestionDetails from "../models/QuestionDetails";
import { create } from "zustand";
import { shuffle } from "../functions/shuffleArray";

interface GamePlayStore {
    state: GameState;
    startGame: (gridDim: GridDim) => void;
    stopGame: () => void;
    onCellClick: (cell: CellModel) => void;
}

const emptyQuestion = {
    allNumbers: [],
    correctSelections: [],
    operator: OperatorType.Addition,
    targetNumber: -1,
};
const defaultState = {} as GameState;

const useGamePlayStore = create<GamePlayStore>((set) => ({
    state: defaultState,
    startGame: (gridDim: GridDim) => {
        set((store) => {
            const tmpQuestion = generateQuestion(gridDim);
            const questionDetails = tmpQuestion ? tmpQuestion : emptyQuestion;
            // console.log(questionDetails);

            const grid = generateGridAndPlaceNumbers(
                gridDim,
                questionDetails.allNumbers
            );

            return {
                state: {
                    ...store.state,
                    questionDetails: questionDetails,
                    gridDim: gridDim,
                    isStarted: true,
                    isAnswerFound: false,
                    currentSelections: [],
                    grid: grid,
                },
            };
        });
    },
    stopGame: () => {},
    onCellClick: (cell: CellModel) => {
        set((store) => {
            if (store.state.isAnswerFound) {
                return { state: store.state };
            }

            const { ri, ci } = cell.pos;
            console.log(`cell (${ri},${ci}) clicked`);

            const maxSelectableCells = 2;
            const currentSelections = [...store.state.currentSelections];

            if (currentSelections.includes(cell)) {
                const idx = currentSelections.findIndex((cm) => cm === cell);
                currentSelections.splice(idx, 1);
            } else {
                if (currentSelections.length === maxSelectableCells) {
                    currentSelections.pop();
                }
                currentSelections.push(cell);
            }

            const correctSelections =
                store.state.questionDetails.correctSelections;
            if (checkForAnswer(currentSelections, correctSelections)) {
                console.log('answer found');
                return {
                    state: {
                        ...store.state,
                        currentSelections: currentSelections,
                        isAnswerFound: true,
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
    },
}));

export default useGamePlayStore;

const checkForAnswer = (
    currentSelectedCells: CellModel[],
    correctSelections: number[]
) => {
    const currSelections = currentSelectedCells.map(c => c.num);

    currSelections.sort();
    correctSelections.sort();

    return currSelections.toString() === correctSelections.toString();

};

const generateGrid: (dim: GridDim) => CellModel[][] = (dim: GridDim) => {
    const { rows, cols } = dim;

    const grid = [];
    for (let ri = 0; ri < rows; ri++) {
        const row = [];
        for (let ci = 0; ci < cols; ci++) {
            row.push({
                pos: { ri, ci },
            } as CellModel);
        }
        grid.push(row);
    }
    return grid;
};

const placeNumbersInShuffledPositions = (
    grid: CellModel[][],
    allNumbers: number[]
) => {
    const gridPositions = grid.flatMap((row) => row.map((cell) => cell.pos));
    shuffle(gridPositions);

    while (allNumbers.length > 0 && gridPositions.length > 0) {
        const { ri, ci } = gridPositions.pop()!;
        grid[ri][ci].num = allNumbers.pop();
    }
};

const generateGridAndPlaceNumbers = (
    gridDim: GridDim,
    allNumbers: number[]
) => {
    // shuffle grid positions
    // place numbers in shuffled grid positions

    const grid = generateGrid(gridDim);
    placeNumbersInShuffledPositions(grid, allNumbers);
    return grid;
};
