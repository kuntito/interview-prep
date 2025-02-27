import { GridDim } from "../../models/GridDim";

export const getNumsNeeded = (dim: GridDim): number | undefined => {
    const { rows, cols } = dim;
    const totalSlots = rows * cols;
    if (totalSlots <= 2) return undefined;

    return totalSlots;
};