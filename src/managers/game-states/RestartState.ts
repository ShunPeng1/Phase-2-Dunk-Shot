import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import GameState from "./GameState";
import { GameStateManager } from "../GameStateManager";
import IStateTransitionData from "../../ultilities/state_machines/IStateTransitionData";

export class RestartState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager, AssetManager.RESTART_UI_SCENE);
    }

    public enterState(enterTransitionData: IStateTransitionData | null): void {
        
        this.scene.cameras.main.stopFollow();

        this.scene.scene.launch(this.sceneName, this.gameStateManager);
    }
}
