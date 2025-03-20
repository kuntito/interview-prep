// it should have a state
// it should have functions to start game and end game
// start timer and end timer?

import GameState from "../models/GameState";


interface GamePlayStore {
    state: GameState;
    startGame: () => void;
    stopGame: () => void;
}