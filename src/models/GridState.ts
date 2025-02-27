import { GridPos } from "../components/NumGrid";
import { CellModel } from "./CellModel";
import { GridDim } from "./GridDim";

export interface GridState {
    dim: GridDim;
    cells: CellModel[][];
    // `selectedCells` is a `list` instead of `set` because
    // the user can select at most 2 cells on the grid
    // if they select a third cell, the second cell is popped
    // and the new cell is added
    selectedCells: GridPos[];
}

export const emptyGridState: GridState = {
    dim: {} as GridDim,
    cells: [],
    selectedCells: [],
};
