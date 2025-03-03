import { GridPos } from "../../components/NumGrid";
import { CellModel } from "../../models/CellModel";
import { GridDim } from "../../models/GridDim";
import { OperandInfo } from "../../models/OperandInfo";
import { getRandomOperator } from "../../models/OperatorType";
import { getNumsNeeded } from "./getNumsNeeded";
import { getOperands } from "./getOperands";
import { getShuffledGridPositions } from "./getShuffledGridPositions";

export const populateCells = (
    dim: GridDim,
): [CellModel[][], OperandInfo?] => {
    const operator = getRandomOperator();
    const numsNeeded = getNumsNeeded(dim);
    const cells = getCellArray(dim);



    if (!numsNeeded) {
        console.log(`grid doesn't have enough cells to place operands`);
        return [cells];
    }

    // using that random operator
    // get `n` number of operands
    // such that `n` < grid_rows * grid_cols
    const operandInfo = getOperands(operator, numsNeeded);
    if (!operandInfo) {
        console.log("could not populate grid");

        return [cells, undefined];
    }

    const allGridPositions: GridPos[] = getShuffledGridPositions(cells);

    const clonedCells: CellModel[][] = cells.map((row) =>
        row.map((cell) => ({ ...cell }))
    );

    // FIXME to display all operands
    const allOperands = [...operandInfo?.allOperands];

    // FIXME to display correct operands
    // const allOperands = [...operandInfo?.mainOperands];

    while (allOperands.length > 0 && allGridPositions.length > 0) {
        const { ri, ci } = allGridPositions.pop()!;
        const op = allOperands.pop();

        clonedCells[ri][ci].num = op;
    }

    return [clonedCells, operandInfo];
};

const getCellArray = (dim: GridDim): CellModel[][] => {
    const cells: CellModel[][] = [];

    const { rows, cols } = dim;

    for (let ri = 0; ri < rows; ri++) {
        const row: CellModel[] = [];
        for (let ci = 0; ci < cols; ci++) {
            const model: CellModel = {
                pos: { ri, ci },
            };
            row.push(model);
        }
        cells.push(row);
    }

    return cells;
};
