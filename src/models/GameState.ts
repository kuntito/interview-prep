// what things change during game play
// time

import OperatorType from "./OperatorType";
import QuestionDetails from "./QuestionDetails";

// grid items
// target number
// target variable
// the above three are connected,
// it makes sense to group them together, gridInfo



interface GameState {
    questionDetails: QuestionDetails,
}

export default GameState;