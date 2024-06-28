import { Scene } from "phaser";
import Ball from "./Ball";


class GameStateManager extends Phaser.Events.EventEmitter {
    private scene : Scene;
    private ball : Ball;
    
    
    
    constructor(scene : Scene, ball : Ball) {
        super();

        this.scene = scene;
        this.ball = ball;
        

    }


}