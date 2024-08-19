import { Scene } from "phaser"
import GameState from "./GameState"
import DunkShotGameStateManager from "../DunkShotGameStateManager"
import AssetManager from "../AssetManager"
import IStateTransitionData from "../../utilities/state-machines/IStateTransitionData"

class ChallengeLoseState extends GameState {

    constructor(scene: Scene, gameStateManager: DunkShotGameStateManager) {
        super(scene, gameStateManager, AssetManager.CHALLENGE_LOSE_UI_SCENE)
    }

    public enterState(enterTransitionData: IStateTransitionData | null): void {

        this.scene.cameras.main.stopFollow()

        this.scene.scene.pause(this.scene)

        this.scene.scene.launch(this.sceneName, this.gameStateManager)
    }

}


export default ChallengeLoseState