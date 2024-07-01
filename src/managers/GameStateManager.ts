import { Scene } from "phaser";
import BaseStateMachine from "../ultilities/state_machines/StateMachine";
import { PauseState } from "./game-states/PauseState";
import { DunkShotGameState } from "./game-states/DunkShotGameState";
import { RestartState } from "./game-states/RestartState";
import { MainMenuState } from "./game-states/MainMenuState";
import AssetManager from "./AssetManager";

export class GameStateManager extends Phaser.Events.EventEmitter {
    private scene : Scene;
    private stateMachine : BaseStateMachine;
    
    private dunkShotGameState: DunkShotGameState;
    private mainMenuState: MainMenuState;
    private restartState: RestartState;
    private pauseState: PauseState;



    constructor(scene: Scene) {
        super();
        
        this.scene = scene;
    
        this.dunkShotGameState = new DunkShotGameState(scene, this);
        this.mainMenuState = new MainMenuState(scene, this);
        this.restartState = new RestartState(scene, this);
        this.pauseState = new PauseState(scene, this);

        this.stateMachine = new BaseStateMachine.Builder()
            .withInitialState(this.mainMenuState, true)
            .build();

        this.stateMachine.addOrOverwriteState(this.dunkShotGameState);
        this.stateMachine.addOrOverwriteState(this.mainMenuState);
        this.stateMachine.addOrOverwriteState(this.restartState);
        this.stateMachine.addOrOverwriteState(this.pauseState);

    }

    public loadGame() {
        this.loadMainMenuUI();
        this.scene.scene.stop(AssetManager.GAME_SCENE); // Stop the current game scene
        this.scene.scene.start(AssetManager.GAME_SCENE); // Start the game scene again, effectively restarting it
    }
    

    public loadMainMenuUI(): void {
        this.stateMachine.setToState(this.mainMenuState, null);
    }

    public loadRestartUI(): void {
        this.stateMachine.setToState(this.restartState, null);
    }

    public loadGameUI(): void {
        this.stateMachine.setToState(this.dunkShotGameState, null);
    }

    public loadPauseUI(): void {
        this.stateMachine.setToState(this.pauseState, null);
    }

}

export default GameStateManager;