import { Scene } from "phaser";
import BaseStateMachine from "../ultilities/state-machines/StateMachine";
import { PauseState } from "./game-states/PauseState";
import { DunkShotGameState } from "./game-states/DunkShotGameState";
import { RestartState } from "./game-states/RestartState";
import { MainMenuState } from "./game-states/MainMenuState";
import AssetManager from "./AssetManager";
import CustomizeState from "./game-states/CustomizeState";
import DunkShotStateMementoStrategy from "./game-states/DunkShotStateMementoStrategy";

export class DunkShotGameStateManager extends Phaser.Events.EventEmitter {
    private scene : Scene;
    private stateMachine : BaseStateMachine;
    
    private dunkShotGameState: DunkShotGameState;
    private mainMenuState: MainMenuState;
    private restartState: RestartState;
    private pauseState: PauseState;
    private customizeState: CustomizeState;


    constructor(scene: Scene) {
        super();
        
        this.scene = scene;
    
        this.dunkShotGameState = new DunkShotGameState(scene, this);
        this.mainMenuState = new MainMenuState(scene, this);
        this.restartState = new RestartState(scene, this);
        this.pauseState = new PauseState(scene, this);
        this.customizeState = new CustomizeState(scene, this);

        this.stateMachine = new BaseStateMachine.Builder()
            .withInitialState(this.mainMenuState, true)
            .withHistoryStrategy(new DunkShotStateMementoStrategy())
            .build();

        this.stateMachine.addOrOverwriteState(this.dunkShotGameState);
        this.stateMachine.addOrOverwriteState(this.mainMenuState);
        this.stateMachine.addOrOverwriteState(this.restartState);
        this.stateMachine.addOrOverwriteState(this.pauseState);
        this.stateMachine.addOrOverwriteState(this.customizeState);

    }

    public loadGame() {
        this.loadMainMenuUI();
        this.scene.scene.stop(AssetManager.DUNK_SHOT_GAME_SCENE); // Stop the current game scene
        this.scene.scene.start(AssetManager.DUNK_SHOT_GAME_SCENE); // Start the game scene again, effectively restarting it
    }
    
    public unloadGame() {
        this.scene.scene.stop(AssetManager.DUNK_SHOT_GAME_SCENE);
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

    public loadCustomizeUI(): void {
        this.stateMachine.setToState(this.customizeState, null);
    }

    public loadPreviousUI(): void {
        this.stateMachine.restoreState();
    }

}

export default DunkShotGameStateManager;