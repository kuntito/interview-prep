import { create } from "zustand";
import { GridPos } from "../components/NumGrid";
import getInitGameState from "../misc_functions/getInitGameState";
import { populateCells } from "../misc_functions/populatingCells/populateCells";
import { GameConfig } from "../models/GameConfig";
import { GameState } from "../models/GameState";
import { OperandInfo } from "../models/OperandInfo";
import { CellModel } from "../models/CellModel";
import { GridDim } from "../models/GridDim";

interface NumGridStore {
    state: GameState;
    initState: (config: GameConfig) => void;
    onCellClick: (pos: GridPos) => void;
    initializeGame: () => void;
    repopulateGrid: () => void;
}

export const defaultGameState: GameState = {
    questionCount: 1,
    isQuestionLimitReached: false,
    score: 0,
    operandInfo: {} as OperandInfo,
    isInitialized: false,
    config: undefined,
    isAnswerFound: false,
    dim: {} as GridDim,
    cells: [],
    selectedCells: [],
};

const useNumGridStore = create<NumGridStore>((set) => ({
    state: defaultGameState,
    initState: (config) => {
        set((store) => {
            return {
                state: getInitGameState(config),
            };
        });
    },
    // each cell click is a toggle, you select and unselect cells
    onCellClick: (pos: GridPos) => {
        set((store) => {
            if (store.state.isAnswerFound) {
                return { state: store.state };
            }

            const { ri, ci } = pos;
            // console.log(`cell (${ri},${ci}) clicked`);

            const maxSelectableCells = 2;

            const selectedCells = [...store.state.selectedCells];
            const [isFindIndex, index] = isPosInArray(pos, selectedCells);

            if (isFindIndex) {
                selectedCells.splice(index!, 1);
            } else {
                if (selectedCells.length == maxSelectableCells) {
                    selectedCells.pop();
                }

                selectedCells.push(pos);
            }

            // if selectedCells are the mainOperands, answer is found
            // update score
            if (
                isSelectedCellsCorrect(
                    selectedCells,
                    store.state.operandInfo.mainOperands,
                    store.state.cells
                )
            ) {
                // console.log("answer found");
                return {
                    state: {
                        ...store.state,
                        selectedCells: selectedCells,
                        isAnswerFound: true,
                        score: store.state.score + 1,
                    },
                };
            }

            return {
                state: { ...store.state, selectedCells: selectedCells },
            };
        });
    },
    initializeGame: () => {
        set((store) => {
            const { dim } = store.state;

            const [newCells, operandInfo] = populateCells(dim);
            if (!operandInfo) return { state: store.state };

            const totalQuestions = store.state.config!.totalQuestions;
            return {
                state: {
                    ...store.state,
                    cells: newCells,
                    operandInfo: operandInfo,
                    isQuestionLimitReached: store.state.questionCount === totalQuestions
                },
            };
        });
    },
    //TODO update store for game end, navigate to end screen
    repopulateGrid: () => {
        
        set((store) => {
            if (store.state.isQuestionLimitReached) {
                console.log('question limit reached');
                return {
                    state: store.state,
                };
            }
            // console.log("repopulate called!");

            // get the initial state
            // populate it with the persistent info i.e. score, questionCount
            const config = store.state.config!;
            // add the cells
            const dim = store.state.dim;
            const [newCells, operandInfo] = populateCells(dim);

            if (!operandInfo) return { state: store.state };

            const newQuestionCount = store.state.questionCount + 1;
            const totalQuestions = store.state.config!.totalQuestions;

            console.log(newQuestionCount + " => " + totalQuestions);
            
            const initState: GameState = {
                ...getInitGameState(config!),
                score: store.state.score,
                questionCount: newQuestionCount,
                cells: newCells,
                operandInfo: operandInfo,
                isQuestionLimitReached: newQuestionCount === totalQuestions,
            };

            return {
                state: initState,
            };
        });
    },

}));

export default useNumGridStore;

const isPosInArray = (
    pos: GridPos,
    selectedCells: GridPos[]
): [boolean, number | undefined] => {
    const index = selectedCells.findIndex(
        (cp) => cp.ri === pos.ri && cp.ci === pos.ci
    );

    const isFindIndex = index !== -1;
    const idx = isFindIndex ? index : undefined;
    return [isFindIndex, idx];
};

const isSelectedCellsCorrect = (
    selectedCells: GridPos[],
    operands: number[],
    cells: CellModel[][]
) => {
    if (!operands) return false;

    const selectedValues = selectedCells.map((pos) => {
        const { ri: r, ci: c } = pos;
        const num = cells[r][c].num;
        return num;
    });

    operands.sort();
    selectedValues.sort();

    return operands.toString() === selectedValues.toString();
};
