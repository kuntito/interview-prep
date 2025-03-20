// what things change during game play
// time

import OperatorType from "./OperatorType";

// grid items
// target number
// target variable
// the above three are connected,
// it makes sense to group them together, gridInfo

interface QuestionDetails {
    gridNumbers: number[],
    targetNumber: number,
    correctSelections: number[],
    operator: OperatorType,
}

interface GameState {
    questionDetails: QuestionDetails,
}

export default GameState;