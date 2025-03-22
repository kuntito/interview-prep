import GridDim from "../models/GridDim";
import OperatorType, { getRandomOperator } from "../models/OperatorType";
import QuestionDetails from "../models/QuestionDetails";
import { getDetailsForOperand } from "./getDetailsForOperand";

const generateQuestion: (dim: GridDim) => QuestionDetails | undefined = (
    dim: GridDim
) => {
    // const operator = getRandomOperator();
    const operator = OperatorType.Addition;
    const numsNeeded = getNumsNeeded(dim);

    if (!numsNeeded) {
        console.log(`grid doesn't have enough cells to place operands`);
        return;
    }
    const questionDetails = getDetailsForOperand(operator, numsNeeded);

    if (questionDetails) {
        questionDetails.allNumbers = [...questionDetails.correctSelections];
    }

    return questionDetails;
};

export default generateQuestion;

const getNumsNeeded = (dim: GridDim): number | undefined => {
    const { rows, cols } = dim;

    const totalSlots = rows * cols;
    if (totalSlots <= 2) return undefined;

    return totalSlots;
};
