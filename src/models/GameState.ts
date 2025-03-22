// what things change during game play
// time

import GridDim from "./GridDim";
import QuestionDetails from "./QuestionDetails";

// grid items
// target number
// target variable
// the above three are connected,
// it makes sense to group them together, gridInfo



interface GameState {
    questionDetails: QuestionDetails,
    gridDim: GridDim,
    isStarted: boolean,
}

export default GameState;