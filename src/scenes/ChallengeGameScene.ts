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

class ChallengeGameScene extends Phaser.Scene {

    private ballSpawnPlace: Phaser.Math.Vector2 = new Phaser.Math.Vector2(150, 450);
    private ball: Ball;
    private invisibleBallFollower: GameObjects.Graphics;

    private hoopSpawner: HoopSpawner;

    private readonly PHYSICS_FPS: number = 300;
    

    constructor() {
        super({ key: AssetManager.CHALLENGE_GAME_SCENE});
    }

    create() {
        var map = this.make.tilemap({
            key: AssetManager.LEVELS_TEST_LEVEL_KEY ,
            tileWidth: 16,
            tileHeight: 16
        });

        const objectLayer = map.createFromObjects("Object Layer 1", {
            
            classType: BasketballHoop,
        
        });

        
        
        this.setupPhysics();
        let gameStateManager = this.setupGameStateManager();
        
        // Order of setup matters
        this.setupBall();
        this.setupHoops();
        this.setupInputHandler();
        this.setupBoundaries();
        this.setupLoseCondition(gameStateManager);

        // Set up effects and UI
        this.setupCamera();
        this.setupStarManagement();
        this.setupScoreManagement();
        this.setupParticle();
        this.setupSound();
    }

    
    private setupPhysics() : void {
        this.physics.world.setFPS(this.PHYSICS_FPS);
        this.physics.world.setBounds(0, 0, AssetManager.WORLD_WIDTH, AssetManager.WORLD_HEIGHT);
    }

    private setupGameStateManager() : DunkShotGameStateManager {
        
        let gameStateManager = new DunkShotGameStateManager(this);
        gameStateManager.loadMainMenuUI();
        return gameStateManager;
    }

    private setupCamera() : void {
    
        // Set the background color to white
        let camera = this.cameras.main;
        camera.setBackgroundColor('#e8e8e8');
        camera.zoom = camera.width / AssetManager.WORLD_WIDTH;
        //camera.zoom = 0.5

        // Camera follow settings
        camera.setPosition(0, 0);
        camera.startFollow(this.invisibleBallFollower, true, 0, 0.01, -AssetManager.WORLD_WIDTH/2 , 100);
            
    }

    private setupBoundaries() : void {
        
        let leftBound = new WallBoundaryImage(this, 0, 0, true);
        let rightBound = new WallBoundaryImage(this, 0, 0, false);

        
        leftBound.setPosition(0, -WallBoundaryImage.BOUND_HEIGHT + AssetManager.WORLD_HEIGHT*2);
        leftBound.setOffset(WallBoundaryImage.BOUND_WIDTH/2, 0);
        rightBound.setPosition(AssetManager.WORLD_WIDTH, -WallBoundaryImage.BOUND_HEIGHT + AssetManager.WORLD_HEIGHT*2);
        rightBound.setOffset(WallBoundaryImage.BOUND_WIDTH*2, 0);
        
        
        leftBound.enableCollision(this.ball, this.ball.wallCollisionCallback);
        rightBound.enableCollision(this.ball,  this.ball.wallCollisionCallback);
            
    }

    private setupBall() : void {
        this.ball = new Ball(this, this.ballSpawnPlace.x, this.ballSpawnPlace.y, AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);
        this.ball.setDrag(0);
        this.ball.setFriction(0);
        this.ball.setAngularDrag(0);

        this.invisibleBallFollower = this.add.graphics();
        this.invisibleBallFollower.setVisible(false);
        this.invisibleBallFollower.setY(600);


       
    }

    private setupHoops() : void {
        

        let hoopFactory = new HoopFactory(this, 0xea4214, 0.5);
        let collectibleFactory = new CollectibleFactory(this);
        let hoopSpawner = new HoopSpawner(this, this.ball, new HoopSpawnSet(
            [
                new HoopSpawnInfo.Builder(BasketballHoop)
                .setSpawnType("RANDOM")
                .setMinOffset(new Phaser.Math.Vector2(120,-100))
                .setMaxOffset(new Phaser.Math.Vector2(500,-200))
                .setRotationVariance(new Phaser.Math.Vector2(-Math.PI/4 , Math.PI/4))
                .setSpawnChance(1)
                .build()
            ], [new CollectibleSpawnInfo(GoldenStarCollectible, 1, -40, 0.5)] , 0.15),
            hoopFactory,
            collectibleFactory,
            70, 
            450);
        


        let hoop1 = hoopFactory.createHoop(BasketballHoop, 150, 600);
        
        this.add.existing(hoop1);
        hoop1.enableOverlap(this.ball, this.ball.internalHoopOverlapCallback);
        hoop1.enableCollision(this.ball, this.ball.hoopCollisionCallback);


        let hoop2 =  hoopFactory.createHoop(BasketballHoop, 350, 500);
        
        this.add.existing(hoop2);
        hoop2.enableOverlap(this.ball, this.ball.internalHoopOverlapCallback);
        hoop2.enableCollision(this.ball, this.ball.hoopCollisionCallback);



        hoopSpawner.setFirstHoop(hoop1);
        hoopSpawner.setNextHoop(hoop2);

        this.hoopSpawner = hoopSpawner;
    }

    private setupInputHandler() : void {
        

        let inputHandler = new DunkShotGameInputHandler(this, this.ball, 
            new BoundaryImageTrajectory(this, this.ball.arcadeBody, 4000, 187, 17, AssetManager.TRAJECTORY_KEY, 0xff9500, 0.15));
        inputHandler.setCurrentHoop(this.hoopSpawner.getFirstHoop()!);

    }

    private setupScoreManagement() : void {
        
        ScoreManager.getInstance().resetScore();
        const scoreCounter = new ScoreCounter(this.hoopSpawner, this.ball);

        

        let scoreText = new ScoreText(
            this, 
            this.cameras.main.width / 2, // X position: Middle of the screen
            this.cameras.main.height / 4, // Y position: Middle of the screen
            '0', 
            { 
                fontSize: 'bold 150px', 
                fontFamily: 'Arial', // Specify a bold font family
                color: '#c6c6c6', // Example color: white
                align: 'center' // Ensure the text is centered
            }
        );
        scoreText.setOrigin(0.5, 0.5); // Center the origin of the text for accurate positioning
        scoreText.setDepth(-5);
        scoreText.setScrollFactor(0, 0); // This line makes the score text follow the camera
    
        scoreCounter.on(scoreCounter.SCORE_UPDATE_EVENT, (totalScore : number, score: number, prefectCount : number, isBounceWall : boolean) => {
            scoreText.updateScore(totalScore);
            //console.log("Total Score ", totalScore,"Score: ", score, " Prefect Count: ", prefectCount, " Bounce Wall: ", isBounceWall);
        });


        let scorePopupText = new ScorePopupText(this, this.ball, scoreCounter);

    }

    private setupStarManagement() : void {
        let starText = new StarText(this, 500, 150, '0', { 
            fontSize: 'bold 40px', 
            fontFamily: 'Arial', // Specify a bold font family
            color: '#f2a63b', // Example color: white
            align: 'center' // Ensure the text is centered
            }
        );

        starText.setScale(0.6);
        starText.setOrigin(0.5, 0.5); // Center the origin of the text for accurate positioning
        starText.setScrollFactor(0, 0); // This line makes the score text follow the camera
   
        starText.updateStar(InventoryManager.getInstance().getItem(AssetManager.GOLDEN_STAR_INVENTORY_KEY));
        
        this.ball.on(this.ball.COLLECTIBLE_OVERLAP_EVENT, (collectible: GoldenStarCollectible) => {
            
            if (collectible instanceof GoldenStarCollectible) {
                starText.updateStar(InventoryManager.getInstance().getItem(AssetManager.GOLDEN_STAR_INVENTORY_KEY));
                const collectibleEndPosition = new Phaser.Math.Vector2(starText.x + this.cameras.main.scrollX - 45, starText.y + this.cameras.main.scrollY);
                collectible.createCollectAnimation(new Phaser.Math.Vector2(collectibleEndPosition));
            }
        });
    }


    private setupLoseCondition(gameStateManager : DunkShotGameStateManager ) : void {
        
        let loseBoundaryImage = new LoseBoundaryImage(this, 20, 1500, AssetManager.WORLD_WIDTH, 100, 0, 1000 , this.hoopSpawner);
        loseBoundaryImage.enableOverlap(this.ball, (ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, loseBoundaryImage: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
            
            if (ball instanceof Ball && loseBoundaryImage instanceof LoseBoundaryImage) {
                let firstHoop = this.hoopSpawner.getFirstHoop();
                
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
                    
                    gameStateManager.loadRestartUI();
                }
            }
        });

    }

    private setupParticle() : void {
        let ballParticle = new BallParticle(this,"", this.ball, this.hoopSpawner, this.invisibleBallFollower);
        
        this.add.existing(ballParticle);
    }

    private setupSound() : void {
        let ballSpeaker = new BallSpeaker(this, this.ball, this.hoopSpawner);


    }

    update() {
        this.followBall();

    }

    private followBall() : void {
        let ballWorldPosition = this.ball.getWorldPosition();

        // Update the invisible object's position to follow the ball
        this.invisibleBallFollower.x = ballWorldPosition.x;
        this.invisibleBallFollower.y = ballWorldPosition.y;
    }

}

export default ChallengeGameScene;