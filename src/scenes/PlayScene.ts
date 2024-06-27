import { Physics, Scene, GameObjects } from "phaser";
import AssetManager from "../AssetManager";
import BasketballHoop from "../entities/hoops/BasketballHoop";

import GameInputHandler from "../players/GameInputHandler";
import Ball from "../entities/Ball";
import HoopSpawner from "../entities/hoops/HoopSpawner";
import HoopSpawnSet from "../entities/hoops/HoopSpawnSet";
import HoopSpawnInfo from "../entities/hoops/HoopSpawnInfo";
import HoopFactory from "../entities/hoops/HoopFactory";

class PlayScene extends Scene {

    private ball: Ball;
    private invisibleBallFollower: GameObjects.Graphics;
    
    constructor() {
        super({ key: AssetManager.PLAY_SCENE });
    }

    preload() {
        //console.log("FPS",  this.physics.world.fps);
    
        this.physics.world.setFPS(2000);
    }

    create() {
        

        // Set the background color to white
        let camera = this.cameras.main;
        camera.setBackgroundColor('#e8e8e8');
        //camera.zoom = 0.5;
        
        // Create the ball with physics enabled
        this.ball = new Ball(this, 150,550 , AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);
        this.ball.setBounce(0.8,0.8);

         // Create an invisible object
        this.invisibleBallFollower = this.add.graphics();
        this.invisibleBallFollower.setVisible(false); // Make it invisible


        // Camera follow settings
        camera.startFollow(this.invisibleBallFollower, true, 0, 0.3, -this.physics.world.bounds.width/2 , 0);
        //camera.setFollowOffset(0, 0); // Adjust if you want an offset
        //camera.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);

        // Create physics group for the invisible bounds
        let boundsGroup = this.physics.add.staticGroup();

        // Define the size of the bounds
        const boundWidth = 10; // Width of the bounds, making them thin
        const boundHeight = 9999999999; // Making the height equal to the camera's height

        // Create left bound
        let leftBound = this.add.rectangle(0, 0, boundWidth, boundHeight, 0x0000ff);
        leftBound.setVisible(false); // Make it invisible
        boundsGroup.add(leftBound); // Add to the physics group

        // Create right bound
        let rightBound = this.add.rectangle(this.cameras.main.width, 0, boundWidth, boundHeight, 0x0000ff);
        rightBound.setVisible(false); // Make it invisible
        boundsGroup.add(rightBound); // Add to the physics group

        // Position the bounds correctly
        leftBound.setPosition(leftBound.width / 2, this.cameras.main.height / 2);
        rightBound.setPosition(this.cameras.main.width - rightBound.width / 2, this.cameras.main.height / 2);

        // Enable physics for the bounds
        this.physics.add.collider(this.ball, boundsGroup, undefined, undefined, this.ball);



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
        
        

        let inputHandler = new GameInputHandler(this, this.ball);
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