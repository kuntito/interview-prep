import { GridPos } from "../components/NumGrid";
import { CellModel } from "./CellModel";
import { GameConfig } from "./GameConfig";
import { GridDim } from "./GridDim";
import { OperandInfo } from "./OperandInfo";

export interface GameState {
    questionCount: number;
    isQuestionLimitReached: boolean;    
    score: number;
    operandInfo: OperandInfo;
    isInitialized: boolean;
    config?: GameConfig;
    isAnswerFound: boolean;
    dim: GridDim;
    cells: CellModel[][];
    // `selectedCells` is a `list` instead of `set` because
    // the user can select at most 2 cells on the grid
    // if they select a third cell, the second cell is popped
    // and the new cell is added
    selectedCells: GridPos[];
}