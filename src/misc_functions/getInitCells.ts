import { CellModel } from "../models/CellModel";
import { GridDim } from "../models/GridDim";

const getInitCells = (dim: GridDim): CellModel[][] => {
    const cells = [];
    const { rows, cols } = dim;

    for (let ri = 0; ri < rows; ri++) {
        const row = [];
        for (let ci = 0; ci < cols; ci++) {
            row.push({
                pos: { ri, ci },
            });
        }
        cells.push(row);
    }

    return cells;
};

export default getInitCells;