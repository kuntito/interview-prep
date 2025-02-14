import { GridPos, NumCellModel } from "../../components/NumCell";
import { GridDim } from "../../components/NumGrid";
import { OperatorType } from "../../models/operators";
import {
    getMultiOperands,
    NumberOperand,
} from "../../util_functions/get_multi_operands";
import { shuffle } from "../../util_functions/shuffle_array";

const maxNum = 20;

const getMaxPairs = (dim: GridDim): number => {
    const { rows, cols } = dim;
    const totalSlots = rows * cols;
    const evenSlotsCount = totalSlots % 2 ? totalSlots - 1 : totalSlots;

    if (evenSlotsCount === 0) return 0;

    const maxPairs = evenSlotsCount / 2;
    return maxPairs;
};

const getNumberOperandSet = (
    maxPairs: number,
    operator: OperatorType
): [NumberOperand, number[]] => {
    // TODO every operator has constraints
    // define a function to that gets `n` random unique numbers based on
    // operators constraints

    // TODO sometimes, there's more than two cells that make up the answer
    const mainNumbers = getNumbersAddConstraint(maxPairs);

    const numberOperands = getMultiOperands(mainNumbers, operator);
    shuffle(numberOperands);

    const mainOperand = numberOperands[0];

    // operands can contain duplicates
    const allOperandsUnique = new Set(
        numberOperands.flatMap((op) => op.operands)
    );
    const allOperands = Array.from(allOperandsUnique);

    // return [mainOperand, allOperands];

    return [{num: 4, operands: [2, 2]}, [2, 2]];
};

export const populateCells = (
    dim: GridDim,
    cells: NumCellModel[][]
): [NumCellModel[][], NumberOperand?, OperatorType?] => {
    // TODO make selection random
    const operator = OperatorType.Addition;
    const maxPairs = getMaxPairs(dim);

    if (maxPairs === 0) {
        console.log(`grid doesn't have enough cells to place operands`);
        return [cells];
    }

    // using that random operator
    // get `n` number of operands
    // such that `n` < grid_rows * grid_cols
    const [mainOperand, allOperands] = getNumberOperandSet(maxPairs, operator);

    const clonedCells: NumCellModel[][] = cells.map((row) =>
        row.map((cell) => ({ ...cell }))
    );

    const allGridPositions: GridPos[] = [];

    for (let ri = 0; ri < clonedCells.length; ri++) {
        const row = clonedCells[ri];
        for (let ci = 0; ci < row.length; ci++) {
            allGridPositions.push({ ri, ci });
        }
    }
    shuffle(allGridPositions);

    while (allOperands.length > 0 && allGridPositions.length > 0) {
        const { ri, ci } = allGridPositions.pop()!;
        const op = allOperands.pop();

        clonedCells[ri][ci].num = op;
    }

    return [clonedCells, mainOperand, operator];
};

const getNumbersAddConstraint = (count: number): number[] => {
    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < count) {
        // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
        const randomValue = Math.random() * maxNum;
        // Math.floor(randomValue) converts the scaled value to an integer between 0 and 98 (inclusive)
        const randomNum = Math.floor(randomValue) + 2;

        uniqueNumbers.add(randomNum);
    }

    return Array.from(uniqueNumbers);
};
