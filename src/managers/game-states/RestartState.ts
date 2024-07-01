import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import GameState from "./GameState";
import { GameStateManager } from "../GameStateManager";

export class RestartState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager, AssetManager.RESTART_UI_SCENE);
    }
}
