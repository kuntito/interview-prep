import GridDim from "./GridDim";

interface GameConfig {
    gridDim: GridDim;
    questionDurationMillis: number;
    overlayDurationMillis: number;
    totalQuestions: number;
}

export default GameConfig;