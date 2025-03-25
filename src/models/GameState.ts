// what things change during game play
// time

import CellModel from "./CellModel";
import GameEndStatus from "./GameEndStatus";
import GridDim from "./GridDim";
import QuestionDetails from "./QuestionDetails";

// grid items
// target number
// target variable
// the above three are connected,
// it makes sense to group them together, gridInfo

interface GameState {
    questionDetails: QuestionDetails;
    gridDim: GridDim;
    questionDurationMillis: number;
    isStarted: boolean;
    currentSelections: CellModel[];
    grid: CellModel[][];
    endStatus?: GameEndStatus;
    score: number;
    qCount: number;
    totalQuestions: number;
}

export default GameState;
