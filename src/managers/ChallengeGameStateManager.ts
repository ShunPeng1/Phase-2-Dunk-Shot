import { Scene } from "phaser"
import BaseStateMachine from "../utilities/state-machines/StateMachine"
import CustomizeState from "./game-states/CustomizeState"
import DunkShotGameState from "./game-states/DunkShotGameState"
import DunkShotStateMementoStrategy from "./game-states/DunkShotStateMementoStrategy"
import DunkShotGameStateManager from "./DunkShotGameStateManager"
import ChallengeStartState from "./game-states/ChallengeStartState"
import GameState from "./game-states/GameState"
import ChallengeLoseState from "./game-states/ChallengeLoseState"
import AssetManager from "./AssetManager"
import ChallengePauseState from "./game-states/ChallengePauseState"
import ChallengeWinState from "./game-states/ChallengeWinState"
import ChallengeConfiguration from "./win-predicates/ChallengeConfiguration"

class ChallengeGameStateManager extends DunkShotGameStateManager {
    
    private challengeWinState: GameState
    private challengeConfiguration: ChallengeConfiguration

    constructor(scene: Scene, challengeConfiguration: ChallengeConfiguration) {
        super(scene)
        this.challengeConfiguration = challengeConfiguration

    }

    protected intializeStateMachine() {
        this.mainGameState = new DunkShotGameState(this.scene, this)
        this.startState = new ChallengeStartState(this.scene, this)
        this.restartState = new ChallengeLoseState(this.scene, this)
        this.pauseState = new ChallengePauseState(this.scene, this)
        this.customizeState = new CustomizeState(this.scene, this)
        this.challengeWinState = new ChallengeWinState(this.scene, this)
        
        this.stateMachine = new BaseStateMachine.Builder()
            .withInitialState(this.startState, true)
            .withHistoryStrategy(new DunkShotStateMementoStrategy())
            .build()

        this.stateMachine.addOrOverwriteState(this.mainGameState)
        this.stateMachine.addOrOverwriteState(this.startState)
        this.stateMachine.addOrOverwriteState(this.restartState)
        this.stateMachine.addOrOverwriteState(this.pauseState)
        this.stateMachine.addOrOverwriteState(this.customizeState)
        this.stateMachine.addOrOverwriteState(this.challengeWinState)
    }

    public reloadChallenge() : void {
    
        this.stateMachine.setToEmptyState()
        this.scene.scene.stop(AssetManager.CHALLENGE_GAME_SCENE) // Stop the current game scene
        this.scene.scene.start(AssetManager.CHALLENGE_GAME_SCENE) // Start the game scene again, effectively restarting it
    
    }

    public loadChallengeMenu() : void {
        this.stateMachine.setToEmptyState()
        this.scene.scene.stop(AssetManager.CHALLENGE_GAME_SCENE)
        this.scene.scene.start(AssetManager.CHALLENGE_MENU_SCENE)
    }

    public loadWinUI() : void {
        this.stateMachine.setToState(this.challengeWinState)
    }

    public getChallengeConfiguration() : ChallengeConfiguration {
        return this.challengeConfiguration
    }
}


export default ChallengeGameStateManager