import { Scene } from "phaser";
import BaseStateMachine from "../ultilities/state-machines/StateMachine";
import CustomizeState from "./game-states/CustomizeState";
import DunkShotGameState from "./game-states/DunkShotGameState";
import DunkShotStateMementoStrategy from "./game-states/DunkShotStateMementoStrategy";
import PauseState from "./game-states/PauseState";
import RestartState from "./game-states/RestartState";
import DunkShotGameStateManager from "./DunkShotGameStateManager";
import ChallengeStartState from "./game-states/ChallengeStartState";

class ChallengeGameStateManager extends DunkShotGameStateManager {

    constructor(scene: Scene) {
        super(scene);
        

    }

    protected intializeStateMachine() {
        this.mainGameState = new DunkShotGameState(this.scene, this);
        this.startState = new ChallengeStartState(this.scene, this);
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

}


export default ChallengeGameStateManager;