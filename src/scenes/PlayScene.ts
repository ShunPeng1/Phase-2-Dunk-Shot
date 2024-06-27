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
    private cursors: any;
    private currentHoop: BasketballHoop;
    private nextHoop: BasketballHoop;

    constructor() {
        super({ key: AssetManager.PLAY_SCENE });
    }

    preload() {
        //console.log("FPS",  this.physics.world.fps);
    
        this.physics.world.setFPS(2000);
    }

    create() {
        // Set the background color to white
        this.cameras.main.setBackgroundColor('#e8e8e8');
        //this.cameras.main.zoom = 0.5;
        
        // Create the ball with physics enabled
        this.ball = new Ball(this, 150,550 , AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);
        this.ball.setBounce(0.8,0.8);

        let hoopFactory = new HoopFactory(this, 0xea4214, 0.5);
    
        let hoopSpawner = new HoopSpawner(this, this.ball, new HoopSpawnSet(
            [
                new HoopSpawnInfo.Builder(BasketballHoop)
                .setSpawnType("RANDOM")
                .setMinOffset(new Phaser.Math.Vector2(0,500))
                .setMaxOffset(new Phaser.Math.Vector2(0,100))
                .setRotationVariance(new Phaser.Math.Vector2(-Math.PI/4, Math.PI/4))
                .setSpawnChance(1)
                .build()
            ]),
            hoopFactory,
            0, 
            800);
        


        let hoop1 = hoopFactory.createHoop(BasketballHoop, 150, 600);
        
        this.add.existing(hoop1);
        hoop1.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop1.enableCollision(this.ball);


        let hoop2 =  hoopFactory.createHoop(BasketballHoop, 350, 500);
        this.nextHoop = hoop2;

        
        this.add.existing(hoop2);
        hoop2.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop2.enableCollision(this.ball);


        let inputHandler = new GameInputHandler(this, this.ball);
        inputHandler.setCurrentHoop(hoop1);


        hoopSpawner.setCurrentHoop(hoop1);
        hoopSpawner.setNextHoop(hoop2);
        hoopSpawner.spawnNextHoop();

        

    }

    

    


}



export default PlayScene;