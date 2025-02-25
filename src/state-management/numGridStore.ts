import { create } from "zustand";
import { GridPos } from "../components/NumGrid";
import { CellModel } from "../models/CellModel";
import { GameState } from "../models/GameState";
import { emptyGridState, GridState } from "../models/GridState";
import { dummyOperandInfo, OperandInfo } from "../models/OperandInfo";
import { GridDim } from "../models/GridDim";
import { GameConfig } from "../models/GameConfig";
import getInitGameState from "../misc_functions/getInitGameState";

interface NumGridStore {
    state: GameState;
    initState: (config: GameConfig) => void;
    onCellClick: (pos: GridPos) => void;
}

const defaultState: GameState = {
    questionCount: 0,
    totalQuestions: 0,
    score: 0,
    gridState: emptyGridState,
    operandInfo: {} as OperandInfo,
    isInitialized: false,
    config: undefined,
};

const useNumGridStore = create<NumGridStore>((set) => ({
    state: defaultState,
    initState: (config) => {
        set((store) => {
            return {
                state: getInitGameState(config, store.state),
            };
        });
    },
    // each cell click is a toggle, you select and unselect cells
    onCellClick: (pos: GridPos) => {
        const { ri, ci } = pos;
        console.log(`cell (${ri},${ci}) clicked`);

        const maxSelectableCells = 2;

        set((store) => {
            const selectedCells = [...store.state.gridState.selectedCells];
            const [isFindIndex, index] = isPosInArray(pos, selectedCells);

            if (isFindIndex) {
                selectedCells.splice(index!, 1);
            } else {
                if (selectedCells.length == maxSelectableCells) {
                    selectedCells.pop();
                }
    
                selectedCells.push(pos);
            }


            const gridState = {
                ...store.state.gridState,
                selectedCells: selectedCells,
            };
            return {
                state: { ...store.state, gridState: gridState },
            };
        });
    },
}));

export default useNumGridStore;

const isPosInArray = (pos: GridPos, selectedCells: GridPos[]): [boolean, number | undefined] => {
    const index = selectedCells.findIndex(
        (cp) => cp.ri === pos.ri && cp.ci === pos.ci
    );

    const isFindIndex = index !== -1;
    const idx = isFindIndex ? index : undefined;
    return [isFindIndex, idx];
}