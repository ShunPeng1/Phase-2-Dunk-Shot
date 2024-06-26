import { Physics, Scene } from "phaser";
import AssetManager from "../AssetManager";
import BasketballHoop from "../entities/BasketballHoop";

import LineCollider from "../entities/physics/LineCollider";
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

    }

    create() {
        // Set the background color to white
        this.cameras.main.setBackgroundColor('#e8e8e8');
    
        let hoop1 = new BasketballHoop(this, 200, 700);
        this.currentHoop = hoop1;

        hoop1.setRingTint(0xea4214);
        hoop1.setPosition(150, 700);
        hoop1.setScale(0.5);
        hoop1.setRotation(3.14*0);


        let hoop2 = new BasketballHoop(this, 600, 400);
        this.nextHoop = hoop2;

        hoop2.setRingTint(0xea4214);
        hoop2.setPosition(400, 400);
        hoop2.setScale(0.5);
        hoop2.setRotation(3.14*0);


        // Create the ball with physics enabled
        this.ball = new Ball(this, 150,650 , AssetManager.BASKETBALL_KEY);
        this.ball.setScale(0.2);

        let inputHandler = new GameInputHandler(this, this.ball);
        inputHandler.setCurrentHoop(hoop1);

        hoop1.enableOverlap(this.ball, inputHandler.onHoopEnter.bind(inputHandler));
        hoop1.enableCollision(this.ball);

        hoop2.enableOverlap(this.ball, inputHandler.onHoopEnter.bind(inputHandler));
        hoop2.enableCollision(this.ball);
        

    }


    
    update() {


    }


}



export default PlayScene;