import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import GameState from "./GameState";
import { GameStateManager } from "../GameStateManager";
import IStateTransitionData from "../../ultilities/state_machines/IStateTransitionData";

export class PauseState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager, AssetManager.PAUSE_UI_SCENE);
    }

    public enterState(enterTransitionData: IStateTransitionData | null): void {
        this.scene.scene.pause(this.scene);

        this.scene.scene.launch(this.sceneName, this.gameStateManager);
    }
    public exitState(exitTransitionData: IStateTransitionData | null): void {
        this.scene.scene.stop(this.sceneName);

        this.scene.scene.resume(this.scene);
    }

}
