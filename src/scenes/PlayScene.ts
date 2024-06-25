import { Physics, Scene } from "phaser";
import AssetManager from "../AssetManager";
import BasketballHoop from "../entities/BasketballHoop";

import LineCollider from "../entities/physics/LineCollider";

class PlayScene extends Scene {

    private ball: Physics.Arcade.Sprite;
    private cursors: any;
    private hoop: BasketballHoop;

    constructor() {
        super({ key: AssetManager.PLAY_SCENE });
    }

    preload() {

    }

    create() {
        // Set the background color to white
        //this.cameras.main.setBackgroundColor('#FFFFFF');
    
        let hoop = new BasketballHoop(this, 400, 400);
        this.hoop = hoop;

        hoop.setRingTint(0xea4214);

        //hoop.setNetScale(3);
        hoop.setPosition(200, 400);

        hoop.setScale(1);

        //hoop.setNetScale(2);

        hoop.setRotation(3.14*0);

        // Create the ball with physics enabled
        this.ball = this.physics.add.sprite(400, 300, AssetManager.BASKETBALL_KEY);
        this.ball.setCollideWorldBounds(true);
        this.ball.setCircle(this.ball.width / 2);

        
        hoop.enableCollision(this.ball);
        

        // Create keyboard inputs
        this.cursors = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });


    }

    
    update() {
        // Reset ball velocity
        this.ball.setVelocity(0);

        // Update ball movement based on keyboard input
        if (this.cursors.left.isDown) {
            this.ball.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.ball.setVelocityX(200);
        }

        if (this.cursors.up.isDown) {
            this.ball.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.ball.setVelocityY(200);
        }


        // Spin the hoop
        this.hoop.setRotation(this.hoop.getRotation() + 0.01);

    }


}



export default PlayScene;