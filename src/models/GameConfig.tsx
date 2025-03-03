import { GridDim } from "./GridDim";

export interface GameConfig {
    gridDim: GridDim;
    totalQuestions: number;
    questionDurationMillis: number;
    overlayDurationMillis: number;
}
