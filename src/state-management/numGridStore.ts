import { create } from "zustand";
import { GridPos, NumCellModel } from "../components/NumCell";
import { GridDim } from "../components/NumGrid";
import initNumGrid from "./functions/initNumGrid";
import { populateCells } from "./functions/populateCells";
import { OperatorType } from "../models/operators";
import { NumberOperand } from "../util_functions/get_multi_operands";


interface BorderProps {
    borderColor: string;
    borderWidth: string;
}

interface GridState {
    dim: GridDim;
    cells: NumCellModel[][];
    selectedCells: GridPos[];
    isAnswerFound: boolean;
    mainOperand?: NumberOperand;
    operator?: OperatorType;
    borderProps: BorderProps;
    timerKey: number;
}

interface NumGridStore {
    state: GridState;
    initCells: (dim: GridDim) => void;
    selectCell: (pos: GridPos) => void;
    populateGrid: () => void;
    reset: () => void;
}

const defaultState = {
    dim: { rows: 0, cols: 0 },
    cells: [],
    selectedCells: [],
    isAnswerFound: false,
    borderProps: {
        borderColor: "palette.100",
        borderWidth: "2px",
    },
    timerKey: 0
};

const useNumGridStore = create<NumGridStore>((set) => ({
    state: { ...defaultState },
    initCells: (dim) =>
        set((store) => {
            return {
                state: {
                    ...store.state,
                    dim: dim,
                    cells: initNumGrid(dim),
                },
            };
        }),
    selectCell: (pos) =>
        set((store) => {
            const selectedCells = [...store.state.selectedCells];

            const { mainOperand, cells, isAnswerFound } = store.state;
            if (isAnswerFound) {
                return { state: store.state };
            }

            // TODO where should this be?
            const maxSelectable = 2;

            const index = selectedCells.findIndex(
                (cell) => cell.ri === pos.ri && cell.ci === pos.ci
            );

            if (index !== -1) {
                selectedCells.splice(index, 1);
            } else {
                if (selectedCells.length === maxSelectable) {
                    selectedCells.pop();
                }
                selectedCells.push(pos);
            }

            if (isSelectedValid(mainOperand, selectedCells, cells)) {
                console.log("answer found");
                return {
                    state: {
                        ...store.state,
                        selectedCells,
                        isAnswerFound: true,
                    },
                };
            }

            const { ri, ci } = pos;
            console.log(`cell (${ri},${ci}) clicked`);

            return { state: { ...store.state, selectedCells } };
        }),
    populateGrid: () =>
        set((store) => {
            const { dim, cells } = store.state;
            const [newCells, mainOperand, operator] = populateCells(dim, cells);

            return {
                state: {
                    ...store.state,
                    cells: newCells,
                    mainOperand: mainOperand,
                    operator: operator,
                },
            };
        }),
    reset: () =>
        set((store) => {
            const { dim } = store.state;
            const newCells = initNumGrid(dim);

            const [populatedCells, mainOperand, operator] = populateCells(
                dim,
                newCells
            );

            return {
                state: {
                    ...defaultState,
                    dim: dim,
                    cells: populatedCells,
                    mainOperand: mainOperand,
                    operator: operator,
                    timerKey: store.state.timerKey + 1,
                },
            };
        }),
    // populateGrid: () =>
    //     set((store) => {
    //         return { state: store.state };
    //     }),
}));

export default useNumGridStore;

const isSelectedValid = (
    mainOperand: NumberOperand | undefined,
    selectedCells: GridPos[],
    cells: NumCellModel[][]
): Boolean => {
    if (!mainOperand) return false;

    const selectedValues = selectedCells.map((pos) => {
        const { ri: r, ci: c } = pos;
        const num = cells[r][c].num;
        return num;
    });

    mainOperand.operands.sort();
    selectedValues.sort();

    return mainOperand.operands.toString() === selectedValues.toString();
};

