import { Scene } from "phaser";
import BaseStateMachine from "../ultilities/state-machines/StateMachine";
import PauseState from "./game-states/PauseState";
import DunkShotGameState from "./game-states/DunkShotGameState";
import RestartState from "./game-states/RestartState";
import MainMenuState from "./game-states/MainMenuState";
import AssetManager from "./AssetManager";
import CustomizeState from "./game-states/CustomizeState";
import DunkShotStateMementoStrategy from "./game-states/DunkShotStateMementoStrategy";
import GameState from "./game-states/GameState";

class DunkShotGameStateManager extends Phaser.Events.EventEmitter {
    protected scene : Scene;
    protected stateMachine : BaseStateMachine;
 
    protected mainGameState: GameState;
    protected startState: GameState;
    protected restartState: RestartState;
    protected pauseState: PauseState;
    protected customizeState: CustomizeState;


    constructor(scene: Scene) {
        super();
        
        this.scene = scene;

        this.intializeStateMachine();
    }

    protected intializeStateMachine() {
        this.mainGameState = new DunkShotGameState(this.scene, this);
        this.startState = new MainMenuState(this.scene, this);
        this.restartState = new RestartState(this.scene, this);
        this.pauseState = new PauseState(this.scene, this);
        this.customizeState = new CustomizeState(this.scene, this);

        this.stateMachine = new BaseStateMachine.Builder()
            .withInitialState(this.startState, true)
            .withHistoryStrategy(new DunkShotStateMementoStrategy())
            .build();

        this.stateMachine.addOrOverwriteState(this.mainGameState);
        this.stateMachine.addOrOverwriteState(this.startState);
        this.stateMachine.addOrOverwriteState(this.restartState);
        this.stateMachine.addOrOverwriteState(this.pauseState);
        this.stateMachine.addOrOverwriteState(this.customizeState);
    }


    public reloadGame() {
        this.stateMachine.setToEmptyState();
        this.scene.scene.stop(AssetManager.DUNK_SHOT_GAME_SCENE); // Stop the current game scene
        this.scene.scene.start(AssetManager.DUNK_SHOT_GAME_SCENE); // Start the game scene again, effectively restarting it
    }
    
    public unloadGame() {
        this.scene.scene.stop(AssetManager.DUNK_SHOT_GAME_SCENE);
    }

    public loadStartUI(): void {
        this.stateMachine.setToState(this.startState, null);
    }

    public loadRestartUI(): void {
        this.stateMachine.setToState(this.restartState, null);
    }

    public loadGameUI(): void {
        this.stateMachine.setToState(this.mainGameState, null);
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