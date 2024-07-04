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
import ChallengeGameStateManager from "../managers/ChallengeGameStateManager";
import ScoreToWinPredicate from "../managers/win-predicates/ScoreToWinPredicate";
import IGoalPredicate from "../managers/win-predicates/types/IGoalPredicate";
import ChallengeConfiguration from "../managers/win-predicates/ChallengeConfiguration";

class ChallengeGameScene extends DunkShotGameScene {

    
    private winCondition: IGoalPredicate;
    private orderHoops: GameObjects.GameObject[];


    constructor() {
        super(AssetManager.CHALLENGE_GAME_SCENE);
    }

    protected setupGameStyle() : void {
        this.setupWinCondition();
        this.setupGameStateManager();
        this.setupHoops();
    }

    
    protected setupGameUI() : void {
        this.setupTopBanner();
        this.setupScoreBackgroundText();
        this.setupHoopCountText();
    }

    protected setupTopBanner(){
        let topBanner = this.add.image(0, 50, AssetManager.MASKS_210_KEY);
        topBanner.setOrigin(0, 0);
        topBanner.setScrollFactor(0);
        topBanner.setScale(5, 1);
        topBanner.setTint(0x37d133);
        topBanner.setDepth(10);

        let challengeText = this.add.text(150, 90, "CHALLENGE", { fontFamily: 'Arial', fontSize: 18, color: '#ffffff' }).setOrigin(0.5);
        challengeText.setScale(1.1,1)
        challengeText.setScrollFactor(0);
        challengeText.setDepth(11);

        let numberText = this.add.text(150, 110, "1", { fontFamily: 'Arial', fontSize: 18, color: '#ffffff' }).setOrigin(0.5);

        numberText.setScrollFactor(0);
        numberText.setDepth(11);


        let icon = this.add.image(265, 100, AssetManager.MASKS_111_KEY);
        icon.setScale(0.5, 0.7);
        icon.setScrollFactor(0);
        icon.setDepth(11);

        let scoreText = this.add.text(315, 100, "0/"+ + this.winCondition.getGoalValue().toString(), { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }).setOrigin(0.5);

        scoreText.setScrollFactor(0);
        scoreText.setDepth(11);

        
        this.scoreCounter.on(this.scoreCounter.SCORE_UPDATE_EVENT, (totalScore : number, score: number, prefectCount : number, isBounceWall : boolean) => {
            scoreText.setText(totalScore + "/" + this.winCondition.getGoalValue().toString());
            console.log("Total Score ", totalScore,"Score: ", score, " Prefect Count: ", prefectCount, " Bounce Wall: ", isBounceWall);
        });

        
    }

    protected setupHoopCountText() {
        let hoopCountText = this.add.text(550, 160, "0/"+ (this.orderHoops.length -1) + " Baskets", { fontFamily: 'Arial', fontSize: 24, color: '#939596' }).setOrigin(1);
        hoopCountText.setScrollFactor(0);
        console.log("setupHoopCountText");
        let currentCount = 0;
        this.ballInteraction.on(BallInteraction.ENTER_NEXT_HOOP_EVENT, (enterHoop: BasketballHoop, lastHoop : BasketballHoop , perfectCount: number, bounceCount: number, isBounceWall: boolean, isBounceRing: boolean) => {
            currentCount++;
            hoopCountText.setText(currentCount+"/"+ (this.orderHoops.length-1) + " Baskets");
        });
    }

    protected setupWinCondition() {
        var map = this.make.tilemap({
            key: AssetManager.LEVELS_TEST_LEVEL_KEY,
            tileWidth: 16,
            tileHeight: 16
        });
    
        const configure = map.findObject("Object Layer 1", obj => obj.name === "Configure") as any;
    
        if (!configure || !configure.properties) {
            throw new Error("No configuration object found in the level");
        }
    
        const levelConfig = new ChallengeConfiguration(configure);
    
        let goalPredicate: IGoalPredicate;
    
        switch (levelConfig.winCondition) {
            case "SCORE":
                goalPredicate = new ScoreToWinPredicate(levelConfig.scoreToWin, () => ScoreManager.getInstance().getScore());
                break;
            default:
                throw new Error("Invalid win condition");
        }
    
        this.winCondition = goalPredicate;

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

        this.ball.setPosition(startPosition.x, this.ballSpawnPlace.y);

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

        this.orderHoops = orderHoops;

        // Set the first and next hoop for the ball interaction
        this.ballInteraction.setFirstHoop(orderHoops[0]);
        this.ballInteraction.setNextHoop(orderHoops[1]);
        this.ballInteraction.setGoalHoop(orderHoops[orderHoops.length - 1]);

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
        let gameStateManager = new ChallengeGameStateManager(this);
        gameStateManager.loadStartUI();

        let loseBoundaryImage = new LoseBoundaryImage(this, 20, 1500, AssetManager.WORLD_WIDTH, 100, 0, 1000 , this.ballInteraction);
        loseBoundaryImage.enableOverlap(this.ball, (ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, loseBoundaryImage: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
            
            if (ball instanceof Ball && loseBoundaryImage instanceof LoseBoundaryImage) {
                let firstHoop = this.ballInteraction.getFirstHoop();
                
                if (firstHoop){
                    ball.setPosition(this.ballSpawnPlace.x, this.ballSpawnPlace.y);
                    ball.stableBall();
                    // Tween the hoop's rotation to 0
                    this.tweens.add({
                        targets: firstHoop,
                        values: {from: firstHoop.getRotation(), to: 0}, 
                        ease: 'Linear',
                        duration: 100,
                        onComplete: () => {
                            // After the rotation tween completes, set the ball's position and velocity
                            ball.setPosition(this.ballSpawnPlace.x, this.ballSpawnPlace.y);
                            ball.pushBall(100, 100, Math.PI/2);
                        },
                        onUpdate: (tween) => {
                            // Update the hoop's rotation during the tween
                            const value = tween.getValue();
                            firstHoop!.setRotation(value);
                        }
                    });
                    
                }
                else{
                    loseBoundaryImage.disableBody();
                    ScoreManager.getInstance().saveHighScore();
                    
                    gameStateManager.loadLoseUI();
                }
            }
        });


        
        this.ballInteraction.on(BallInteraction.ENTER_GOAL_HOOP_EVENT, (enterHoop: BasketballHoop) => {
            if (this.winCondition.checkGoalAchieved()) {
                gameStateManager.loadWinUI();
            }
            else{
                gameStateManager.loadLoseUI();
            }
        });
    }

}



export default ChallengeGameScene;