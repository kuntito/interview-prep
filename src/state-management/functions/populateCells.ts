import { GridPos, NumCellModel } from "../../components/NumCell";
import { GridDim } from "../../components/NumGrid";
import { getRandomOperator, OperatorType } from "../../models/operators";
import {
    NumberOperand,
} from "../../util_functions/get_multi_operands";
import { getOperands } from "../../util_functions/get_operands";
import { shuffle } from "../../util_functions/shuffle_array";


const getNumsNeeded = (dim: GridDim): number | undefined => {
    const { rows, cols } = dim;
    const totalSlots = rows * cols;
    if (totalSlots <= 2) return undefined;

    return totalSlots;
};

export const populateCells = (
    dim: GridDim,
    cells: NumCellModel[][]
): [NumCellModel[][], NumberOperand?, OperatorType?] => {
    const operator = getRandomOperator();
    const numsNeeded = getNumsNeeded(dim);

    if (!numsNeeded) {
        console.log(`grid doesn't have enough cells to place operands`);
        return [cells];
    }

    // using that random operator
    // get `n` number of operands
    // such that `n` < grid_rows * grid_cols
    const numberOperand = getOperands(operator, numsNeeded);
    if (!numberOperand) {
        console.log("could not populate grid");
    
        return [cells, undefined, undefined];
    }

    
    
    const allGridPositions: GridPos[] = getShuffledGridPositions(cells);
    
    const clonedCells: NumCellModel[][] = cells.map((row) =>
        row.map((cell) => ({ ...cell }))
    );

    const allNumbers = numberOperand?.allNumbers;
    while (allNumbers.length > 0 && allGridPositions.length > 0) {
        const { ri, ci } = allGridPositions.pop()!;
        const op = allNumbers.pop();

        clonedCells[ri][ci].num = op;
    }

    return [clonedCells, numberOperand, operator];
};



const getShuffledGridPositions = (cells: NumCellModel[][]): GridPos[] => {
    const positions = []
    for (let ri = 0; ri < cells.length; ri++) {
        const row = cells[ri];
        for (let ci = 0; ci < row.length; ci++) {
            positions.push({ ri, ci });
        }
    }

    shuffle(positions)
    return positions;
}

