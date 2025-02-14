import { NumCellModel } from "../../components/NumCell";
import { GridDim } from "../../components/NumGrid";

// NumCellModel is the interface that represents a cell
const initNumGrid = (dim: GridDim): NumCellModel[][] => {
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

export default initNumGrid;