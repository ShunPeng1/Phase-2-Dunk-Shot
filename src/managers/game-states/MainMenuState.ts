import { Scene } from "phaser"
import AssetManager from "../AssetManager"
import GameState from "./GameState"
import DunkShotGameStateManager from "../DunkShotGameStateManager"

class MainMenuState extends GameState {

    constructor(scene: Scene, gameStateManager: DunkShotGameStateManager) {
        super(scene, gameStateManager, AssetManager.MAIN_MENU_UI_SCENE)
    }
}

export default MainMenuState