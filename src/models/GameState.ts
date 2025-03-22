// what things change during game play
// time

import CellModel from "./CellModel";
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
    isStarted: boolean;
    isAnswerFound: boolean;
    currentSelections: CellModel[];
    grid: CellModel[][];
}

export default GameState;
