import { Scene } from "phaser";
import GameState from "./GameState";
import GameStateManager from "../GameStateManager";
import AssetManager from "../AssetManager";
import IStateTransitionData from "../../ultilities/state_machines/IStateTransitionData";

class CustomizeState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager, AssetManager.CUSTOMIZE_UI_SCENE);
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


export default CustomizeState;