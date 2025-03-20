import GridDim from "./GridDim";

interface GameConfig {
    gridDim: GridDim;
    questionDurationMillis: number;
    totalQuestions: number;
}

export default GameConfig;