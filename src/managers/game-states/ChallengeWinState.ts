import { Scene } from "phaser"
import IStateTransitionData from "../../utilities/state-machines/IStateTransitionData"
import AssetManager from "../AssetManager"
import DunkShotGameStateManager from "../DunkShotGameStateManager"
import GameState from "./GameState"

class ChallengeWinState extends GameState {

    constructor(scene: Scene, gameStateManager: DunkShotGameStateManager) {
        super(scene, gameStateManager, AssetManager.CHALLENGE_WIN_UI_SCENE)
    }

    public enterState(enterTransitionData: IStateTransitionData | null): void {

        this.scene.cameras.main.stopFollow()

        this.scene.scene.pause(this.scene)

        this.scene.scene.launch(this.sceneName, this.gameStateManager)
    }

}

export default ChallengeWinState