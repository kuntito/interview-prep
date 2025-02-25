import { GameConfig } from "./GameConfig";
import { GridState } from "./GridState";
import { OperandInfo } from "./OperandInfo";

export interface GameState {
    questionCount: number;
    totalQuestions: number;
    score: number;
    gridState: GridState;
    operandInfo: OperandInfo;
    isInitialized: boolean;
    config?: GameConfig;
}