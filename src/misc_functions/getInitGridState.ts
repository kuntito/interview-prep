import { GridDim } from "../models/GridDim";
import { GridState } from "../models/GridState";
import getInitCells from "./getInitCells";

const getInitGridState = (dim: GridDim, state: GridState): GridState => {
    return { ...state, cells: getInitCells(dim), dim: dim };
};

export default getInitGridState;
