import { Scene } from "phaser";
import IState from "../../ultilities/state_machines/IState";
import IStateTransitionData from "../../ultilities/state_machines/IStateTransitionData";
import GameStateManager from "../GameStateManager";

class GameState implements IState {
    
    protected scene: Scene;
    protected gameStateManager: GameStateManager;
    protected sceneName: string;

    constructor(scene : Scene, gameStateManager: GameStateManager, sceneName: string) {
        this.scene = scene;
        this.gameStateManager = gameStateManager;
        this.sceneName = sceneName;
        
    }
    public enterState(enterTransitionData: IStateTransitionData | null): void {
        this.scene.scene.launch(this.sceneName, this.gameStateManager);
    }
    public exitState(exitTransitionData: IStateTransitionData | null): void {
        this.scene.scene.stop(this.sceneName);
    }
    public update(deltaTime: number, transitionData: IStateTransitionData | null): void {
        // Do nothing
    }
    
}

export default GameState;