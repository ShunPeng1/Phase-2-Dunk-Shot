import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import GameState from "./GameState";
import { GameStateManager } from "../GameStateManager";

export class DunkShotGameState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager, AssetManager.DUNK_SHOT_GAME_UI_SCENE);
    }
}
