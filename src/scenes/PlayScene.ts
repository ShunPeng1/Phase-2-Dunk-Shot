import { Physics, Scene, GameObjects } from "phaser";
import AssetManager from "../AssetManager";
import BasketballHoop from "../entities/hoops/BasketballHoop";

import GameInputHandler from "../players/GameInputHandler";
import Ball from "../entities/Ball";

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
    
        let hoop1 = new BasketballHoop(this, 150, 600);
        this.currentHoop = hoop1;

        hoop1.setRingTint(0xea4214);
        hoop1.setScale(0.5);
        hoop1.setRotation(3.14*0);


        let hoop2 = new BasketballHoop(this, 350, 500);
        this.nextHoop = hoop2;

        hoop2.setRingTint(0xea4214);
        hoop2.setScale(0.5);
        hoop2.setRotation(3.14*0);


        // Create the ball with physics enabled
        this.ball = new Ball(this, 150,550 , AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);
        this.ball.setBounce(0.8,0.8);

        let inputHandler = new GameInputHandler(this, this.ball);
        inputHandler.setCurrentHoop(hoop1);

        hoop1.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop1.enableCollision(this.ball);

        hoop2.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop2.enableCollision(this.ball);
        

    }

    

    


}



export default PlayScene;