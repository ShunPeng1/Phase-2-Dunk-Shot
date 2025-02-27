import { Scene } from "phaser"
import AssetManager from "../AssetManager"
import GameState from "./GameState"
import DunkShotGameStateManager from "../DunkShotGameStateManager"
import IStateTransitionData from "../../utilities/state-machines/IStateTransitionData"

class ChallengePauseState extends GameState {

    constructor(scene: Scene, gameStateManager: DunkShotGameStateManager) {
        super(scene, gameStateManager, AssetManager.CHALLENGE_PAUSE_UI_SCENE)
    }

    public enterState(enterTransitionData: IStateTransitionData | null): void {
        this.scene.scene.pause(this.scene)

        this.scene.scene.launch(this.sceneName, this.gameStateManager)
        this.scene.scene.bringToTop(this.sceneName)
    }
    public exitState(exitTransitionData: IStateTransitionData | null): void {
        this.scene.scene.stop(this.sceneName)

        this.scene.scene.resume(this.scene)
    }

}


export default ChallengePauseState