import { GridPos } from "../../components/NumGrid";
import { CellModel } from "../../models/CellModel";
import { shuffle } from "../shuffleArray";


export const getShuffledGridPositions = (cells: CellModel[][]): GridPos[] => {
    const positions = [];
    for (let ri = 0; ri < cells.length; ri++) {
        const row = cells[ri];
        for (let ci = 0; ci < row.length; ci++) {
            positions.push({ ri, ci });
        }
    }

    shuffle(positions);
    return positions;
};
