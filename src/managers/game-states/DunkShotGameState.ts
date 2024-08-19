import { Scene } from "phaser"
import AssetManager from "../AssetManager"
import GameState from "./GameState"
import DunkShotGameStateManager from "../DunkShotGameStateManager"

class DunkShotGameState extends GameState {

    constructor(scene: Scene, gameStateManager: DunkShotGameStateManager) {
        super(scene, gameStateManager, AssetManager.DUNK_SHOT_GAME_UI_SCENE)
    }
}


export default DunkShotGameState