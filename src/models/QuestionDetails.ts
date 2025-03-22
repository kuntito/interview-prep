import OperatorType from "./OperatorType";

interface QuestionDetails {
    allNumbers: number[];
    targetNumber: number;
    correctSelections: number[];
    operator: OperatorType;
}

export default QuestionDetails;
