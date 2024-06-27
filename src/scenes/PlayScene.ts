import { Physics, Scene, GameObjects } from "phaser";
import AssetManager from "../AssetManager";
import BasketballHoop from "../entities/hoops/BasketballHoop";

import GameInputHandler from "../players/GameInputHandler";
import Ball from "../entities/Ball";
import HoopSpawner from "../entities/hoops/HoopSpawner";
import HoopSpawnSet from "../entities/hoops/HoopSpawnSet";
import HoopSpawnInfo from "../entities/hoops/HoopSpawnInfo";
import HoopFactory from "../entities/hoops/HoopFactory";
import BoundaryImage from "../entities/BoundaryImage";
import ImageTrajectory from "../entities/trajectories/ImageTrajectory";

class PlayScene extends Scene {

    private ball: Ball;
    private invisibleBallFollower: GameObjects.Graphics;

    private readonly PHYSICS_FPS: number = 300;
    private readonly WORLD_WIDTH: number = 520;
    private readonly WORLD_HEIGHT: number = this.WORLD_WIDTH / 9 * 16;
    
    constructor() {
        super({ key: AssetManager.PLAY_SCENE });
    }

    preload() {
        //console.log("FPS",  this.physics.world.fps);
    
        this.physics.world.setFPS(this.PHYSICS_FPS);

        this.physics.world.setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);

        console.log(this.physics.world.bounds)
    }

    create() {
        

        // Set the background color to white
        let camera = this.cameras.main;
        camera.setBackgroundColor('#e8e8e8');
        camera.zoom = camera.width / this.WORLD_WIDTH;
        //camera.width = this.WORLD_WIDTH;
        
        // Create the ball with physics enabled
        this.ball = new Ball(this, 150,550 , AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);
        this.ball.setBounce(0.8,0.8);

         // Create an invisible object
        this.invisibleBallFollower = this.add.graphics();
        this.invisibleBallFollower.setVisible(false); // Make it invisible


        // Camera follow settings
        camera.startFollow(this.invisibleBallFollower, true, 0, 0.05, -this.WORLD_WIDTH/2 , 0);
        //camera.setFollowOffset(0, 0); // Adjust if you want an offset
        //camera.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);

        // Create physics group for the invisible bounds
        

        // Define the size of the bounds
        const boundWidth = 10; // Width of the bounds, making them thin
        const boundHeight = 999999999999; // Height of the bounds, making them tall

        let leftBound = new BoundaryImage(this, 0, 0, '');
        let rightBound = new BoundaryImage(this, 0, 0, '');

        leftBound.setPosition(0, 0);
        rightBound.setPosition(this.WORLD_WIDTH, 0);

        
        leftBound.enableCollision(this.ball);
        rightBound.enableCollision(this.ball);
        
        
        

        let hoopFactory = new HoopFactory(this, 0xea4214, 0.5);
    
        let hoopSpawner = new HoopSpawner(this, this.ball, new HoopSpawnSet(
            [
                new HoopSpawnInfo.Builder(BasketballHoop)
                .setSpawnType("RANDOM")
                .setMinOffset(new Phaser.Math.Vector2(0,-100))
                .setMaxOffset(new Phaser.Math.Vector2(380,-200))
                .setRotationVariance(new Phaser.Math.Vector2(-Math.PI/4 * 0, 0 * Math.PI/4))
                .setSpawnChance(1)
                .build()
            ]),
            hoopFactory,
            70, 
            450);
        


        let hoop1 = hoopFactory.createHoop(BasketballHoop, 150, 600);
        
        this.add.existing(hoop1);
        hoop1.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop1.enableCollision(this.ball);


        let hoop2 =  hoopFactory.createHoop(BasketballHoop, 350, 500);
        
        this.add.existing(hoop2);
        hoop2.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop2.enableCollision(this.ball);



        hoopSpawner.setCurrentHoop(hoop1);
        hoopSpawner.setNextHoop(hoop2);
        
        

        let inputHandler = new GameInputHandler(this, this.ball, 
            new ImageTrajectory(this, this.ball.arcadeBody, 4000, 240, 30, AssetManager.TRAJECTORY_KEY, 0xff9500, 0.3));
        inputHandler.setCurrentHoop(hoop1);

    }

    

    update() {
        let ballWorldPosition = this.ball.getWorldPosition();

        // Update the invisible object's position to follow the ball
        this.invisibleBallFollower.x = ballWorldPosition.x;
        this.invisibleBallFollower.y = ballWorldPosition.y;

    }

}



export default PlayScene;