import { GameObjects } from "phaser";
import Ball from "../entities/balls/Ball";
import BasketballHoop from "../entities/hoops/BasketballHoop";
import AssetManager from "../managers/AssetManager";
import HoopSpawner from "../entities/hoops/HoopSpawner";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import WallBoundaryImage from "../entities/boundaries/WallBoundaryImage";
import BallParticle from "../entities/balls/BallParticle";
import LoseBoundaryImage from "../entities/boundaries/LoseBoundaryImage";
import CollectibleFactory from "../entities/collectibles/CollectibleFactory";
import CollectibleSpawnInfo from "../entities/collectibles/CollectibleSpawnInfo";
import GoldenStarCollectible from "../entities/collectibles/GoldenStarCollectible";
import HoopFactory from "../entities/hoops/HoopFactory";
import HoopSpawnInfo from "../entities/hoops/HoopSpawnInfo";
import HoopSpawnSet from "../entities/hoops/HoopSpawnSet";
import ScoreCounter from "../entities/scores/ScoreCounter";
import ScorePopupText from "../entities/scores/ScorePopupText";
import ScoreText from "../entities/scores/ScoreText";
import StarText from "../entities/scores/StarText";
import BallSpeaker from "../entities/sounds/BallSpeaker";
import BoundaryImageTrajectory from "../entities/trajectories/BoundaryImageTrajectory";
import DunkShotGameInputHandler from "../input-handlers/DunkShotGameInputHandler";
import InventoryManager from "../managers/InventoryManager";
import ScoreManager from "../managers/ScoreManager";
import DunkShotGameScene from "./DunkShotGameScene";

class ChallengeGameScene extends DunkShotGameScene {

    constructor() {
        super(AssetManager.CHALLENGE_GAME_SCENE);
    }


}

export default ChallengeGameScene;