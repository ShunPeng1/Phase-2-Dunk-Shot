import { Scene } from "phaser";
import IState from "../../ultilities/state-machines/IState";
import IStateTransitionData from "../../ultilities/state-machines/IStateTransitionData";
import DunkShotGameStateManager from "../DunkShotGameStateManager";

class GameState implements IState {
    
    protected scene: Scene;
    protected gameStateManager: DunkShotGameStateManager;
    protected sceneName: string;

    constructor(scene : Scene, gameStateManager: DunkShotGameStateManager, sceneName: string) {
        this.scene = scene;
        this.gameStateManager = gameStateManager;
        this.sceneName = sceneName;
        
    }
    public enterState(enterTransitionData: IStateTransitionData | null): void {
        this.scene.scene.launch(this.sceneName, this.gameStateManager);
        this.scene.scene.bringToTop(this.sceneName);
    }
    public exitState(exitTransitionData: IStateTransitionData | null): void {
        this.scene.scene.stop(this.sceneName);
    }
    public update(deltaTime: number, transitionData: IStateTransitionData | null): void {
        // Do nothing
    }
    
}

export default GameState;