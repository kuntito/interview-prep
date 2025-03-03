import { GameConfig } from "../models/GameConfig";
import { GameState } from "../models/GameState";
import { defaultGameState } from "../state-management/numGridStore";
import getInitCells from "./getInitCells";

const getInitGameState = (config: GameConfig): GameState => {
    const { gridDim } = config;
    return {
        ...defaultGameState,
        cells: getInitCells(gridDim),
        dim: gridDim,
        isInitialized: true,
        config: config,
    };
};

export default getInitGameState;
