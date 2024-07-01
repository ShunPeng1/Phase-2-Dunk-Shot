import { Physics, Scene, GameObjects } from "phaser";
import AssetManager from "../managers/AssetManager";
import BasketballHoop from "../entities/hoops/BasketballHoop";

import GameInputHandler from "../input-handlers/GameInputHandler";
import Ball from "../entities/Ball";
import HoopSpawner from "../entities/hoops/HoopSpawner";
import HoopSpawnSet from "../entities/hoops/HoopSpawnSet";
import HoopSpawnInfo from "../entities/hoops/HoopSpawnInfo";
import HoopFactory from "../entities/hoops/HoopFactory";
import BoundaryImage from "../entities/BoundaryImage";
import ImageTrajectory from "../entities/trajectories/ImageTrajectory";
import BoundaryImageTrajectory from "../entities/trajectories/BoundaryImageTrajectory";
import ScoreText from "../ui/ScoreText";
import ScoreCounter from "../entities/scores/ScoreCounter";
import LoseBoundaryImage from "../entities/LoseBoundaryImage";
import GameStateManager from "../managers/GameStateManager";

class GameScene extends Scene {

    private ball: Ball;
    private invisibleBallFollower: GameObjects.Graphics;

    private readonly PHYSICS_FPS: number = 300;
    
    
    constructor() {
        super({ key: AssetManager.GAME_SCENE });
    }

    preload() {
        //console.log("FPS",  this.physics.world.fps);
    
        this.physics.world.setFPS(this.PHYSICS_FPS);

        this.physics.world.setBounds(0, 0, AssetManager.WORLD_WIDTH, AssetManager.WORLD_HEIGHT);

        
        // Set the background color to white
        let camera = this.cameras.main;
        camera.setBackgroundColor('#e8e8e8');
        camera.zoom = camera.width / AssetManager.WORLD_WIDTH;
        //camera.zoom = 0.5;
    }

    create() {
        
        let gameStateManager = new GameStateManager(this);
        gameStateManager.loadMainMenuUI();

        // Set the background color to white
        let camera = this.cameras.main;
        
        
        
        // Create the ball with physics enabled
        const ballSpawnPlace = new Phaser.Math.Vector2(150, 550);
        this.ball = new Ball(this, ballSpawnPlace.x, ballSpawnPlace.y, AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);
        this.ball.setDrag(0);
        this.ball.setFriction(0);
        this.ball.setAngularDrag(0);
        
        // Create an invisible object
        this.invisibleBallFollower = this.add.graphics();
        this.invisibleBallFollower.setVisible(false); // Make it invisible


        // Camera follow settings
        camera.startFollow(this.invisibleBallFollower, true, 0, 0.025, -AssetManager.WORLD_WIDTH/2 , 0);
        
        
        

        let leftBound = new BoundaryImage(this, 0, 0, '');
        let rightBound = new BoundaryImage(this, 0, 0, '');

        leftBound.setPosition(0, -leftBound.BOUND_HEIGHT + AssetManager.WORLD_HEIGHT*2);
        leftBound.setOffset(leftBound.BOUND_WIDTH/2, 0);
        rightBound.setPosition(AssetManager.WORLD_WIDTH, -rightBound.BOUND_HEIGHT + AssetManager.WORLD_HEIGHT*2);
        rightBound.setOffset(rightBound.BOUND_WIDTH*2, 0);

        
        leftBound.enableCollision(this.ball, this.ball.wallCollisionCallback);
        rightBound.enableCollision(this.ball,  this.ball.wallCollisionCallback);
        
        
        

        let hoopFactory = new HoopFactory(this, 0xea4214, 0.5);
    
        let hoopSpawner = new HoopSpawner(this, this.ball, new HoopSpawnSet(
            [
                new HoopSpawnInfo.Builder(BasketballHoop)
                .setSpawnType("RANDOM")
                .setMinOffset(new Phaser.Math.Vector2(120,-100))
                .setMaxOffset(new Phaser.Math.Vector2(500,-200))
                .setRotationVariance(new Phaser.Math.Vector2(-Math.PI/4 , Math.PI/4))
                .setSpawnChance(1)
                .build()
            ]),
            hoopFactory,
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



        hoopSpawner.setCurrentHoop(hoop1);
        hoopSpawner.setNextHoop(hoop2);
        
        

        let inputHandler = new GameInputHandler(this, this.ball, 
            new BoundaryImageTrajectory(this, this.ball.arcadeBody, 4000, 187, 17, AssetManager.TRAJECTORY_KEY, 0xff9500, 0.15));
        inputHandler.setCurrentHoop(hoop1);


        
        const scoreCounter = new ScoreCounter(hoopSpawner, this.ball);

        

        let scoreText = new ScoreText(
            this, 
            this.cameras.main.width / 2, // X position: Middle of the screen
            this.cameras.main.height / 4, // Y position: Middle of the screen
            '0', 
            { 
                fontSize: 'bold 150px', 
                fontFamily: 'Arial Bold', // Specify a bold font family
                color: '#c6c6c6', // Example color: white
                align: 'center' // Ensure the text is centered
            }
        );
        scoreText.setOrigin(0.5, 0.5); // Center the origin of the text for accurate positioning
        scoreText.setDepth(-5);
        scoreText.setScrollFactor(0, 0); // This line makes the score text follow the camera
    
        scoreCounter.on(scoreCounter.SCORE_UPDATE_EVENT, (totalScore : number, score: number, prefectCount : number, isBounceWall : boolean) => {
            scoreText.updateScore(totalScore);
            console.log("Total Score ", totalScore,"Score: ", score, " Prefect Count: ", prefectCount, " Bounce Wall: ", isBounceWall);
        });


        let loseBoundaryImage = new LoseBoundaryImage(this, 20, 1500, AssetManager.WORLD_WIDTH, 100, 0, 1000 , hoopSpawner, hoop1);
        loseBoundaryImage.enableOverlap(this.ball, (ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, loseBoundaryImage: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) => {
            console.log("LOSE");
            
            if (ball instanceof Ball && loseBoundaryImage instanceof LoseBoundaryImage) {
                if (loseBoundaryImage.getIsFirstHoop()){
                    ball.setPosition(ballSpawnPlace.x, ballSpawnPlace.y);
                }
                else{
                    gameStateManager.loadRestartUI();
                }
            }
        });


    }

    

    update() {
        let ballWorldPosition = this.ball.getWorldPosition();

        // Update the invisible object's position to follow the ball
        this.invisibleBallFollower.x = ballWorldPosition.x;
        this.invisibleBallFollower.y = ballWorldPosition.y;

    }

}



export default GameScene;