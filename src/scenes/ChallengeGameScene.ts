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
import BallInteraction from "../entities/balls/BallInteraction";

class ChallengeGameScene extends DunkShotGameScene {

    constructor() {
        super(AssetManager.CHALLENGE_GAME_SCENE);
    }

    protected setupHoops(): void {

        var map = this.make.tilemap({
            key: AssetManager.LEVELS_TEST_LEVEL_KEY ,
            tileWidth: 16,
            tileHeight: 16
        });

        const startPosition = map.findObject("Object Layer 1", obj => obj.name === "Start Position") as unknown as Phaser.GameObjects.Image;

        const basketballHoopInLayer = map.createFromObjects("Object Layer 1", {
            gid : 8,
            classType: BasketballHoop,
        
        });

        let offsetY = this.ballSpawnPlace.y - startPosition.y;

        console.log(basketballHoopInLayer);

        
        let orderHoops : BasketballHoop[] = [];
        
        
        basketballHoopInLayer.sort((a, b) => {
            const hoopA = a as BasketballHoop;
            const hoopB = b as BasketballHoop;
            const positionA = hoopA.getPosition();
            const positionB = hoopB.getPosition();
            return positionB.y - positionA.y; // Ascending order by y position
        }).forEach(element => {

            const hoop = element as BasketballHoop;
            //this.add.existing(hoop);
            const position = hoop.getPosition()
            hoop.setPosition(position.x, position.y + offsetY);
            hoop.setRotation(hoop.rotation);
            this.initializeHoop(hoop);

            orderHoops.push(hoop);
            
        });


        if (orderHoops.length < 3) {
            throw new Error("Not enough hoops in the level");
        }

        // Set the first and next hoop for the ball interaction
        this.ballInteraction.setFirstHoop(orderHoops[0]);
        this.ballInteraction.setNextHoop(orderHoops[1]);

        let currentHoopIndex = 1;

        this.ballInteraction.on(BallInteraction.ENTER_NEXT_HOOP_EVENT, (enterHoop: BasketballHoop, lastHoop : BasketballHoop , perfectCount: number, bounceCount: number, isBounceWall: boolean, isBounceRing: boolean) => {
            if (lastHoop) {
                lastHoop.destroy();
            }

            let nextHoop = orderHoops[currentHoopIndex + 1];
            
            if (nextHoop) {
                this.ballInteraction.advanceNextHoop(nextHoop);
                currentHoopIndex++;
            }
            
        });

    }

    protected setupGameStateManager(): void {
        //this.gameStateManager = new DunkShotGameStateManager();


    }

}

export default ChallengeGameScene;