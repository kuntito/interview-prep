import { GridPos } from "../components/NumGrid";

export interface CellModel {
    pos: GridPos;
    // `num` is undefined on the blank grid
    num?: number;
}