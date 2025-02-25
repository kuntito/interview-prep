import { GridPos } from "../components/NumGrid";
import { CellModel } from "./CellModel";

export interface GridState {
    cells: CellModel[][];
    // `selectedCells` is a `list` instead of `set` because
    // the user can select at most 2 cells on the grid
    // if they select a third cell, the second cell is popped
    // and the new cell is added
    selectedCells: GridPos[];
}

export const emptyGridState: GridState = {
    cells: [],
    selectedCells: [],
};
