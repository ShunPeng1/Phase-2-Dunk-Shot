import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import GameState from "./GameState";
import { GameStateManager } from "../GameStateManager";

export class MainMenuState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager, AssetManager.MAIN_MENU_UI_SCENE);
    }
}
