import { GameConfig } from "../models/GameConfig";
import { GameState } from "../models/GameState";
import getInitGridState from "./getInitGridState";

const getInitGameState = (config: GameConfig, state: GameState): GameState => {
    const { totalQuestions, gridDim } = config;
    const gridState = getInitGridState(gridDim, state.gridState);
    return {
        ...state,
        totalQuestions: totalQuestions,
        gridState: gridState,
        isInitialized: true,
        config: config,
    };
};

export default getInitGameState;