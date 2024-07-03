import { Scene } from "phaser";
import Ball from "../balls/Ball";
import HoopSpawner from "../hoops/HoopSpawner";
import AssetManager from "../../managers/AssetManager";

class BallSpeaker extends Phaser.GameObjects.GameObject {
    private ball : Ball;
    private hoopSpawner : HoopSpawner;

    constructor(scene : Scene, ball : Ball, hoopSpawner : HoopSpawner) {
        super(scene, "BallSpeaker");
        this.ball = ball;
    
        this.ball.on(this.ball.RING_HOOP_COLLIDE_EVENT, this.playRingSound.bind(this));
        this.ball.on(this.ball.WALL_COLLIDE_EVENT, this.playWallSound.bind(this));
        this.ball.on(this.ball.NET_COLLIDE_EVENT, this.playNetSound.bind(this));
    
        this.hoopSpawner = hoopSpawner;

        this.hoopSpawner.subscribeToEnterNextHoop(this.playRingSound.bind(this));
        this.hoopSpawner.subscribeToEnterCurrentHoop(this.playWallSound.bind(this));

        
        this.scene.add.existing(this);

    }

    private playRingSound() : void {
        this.scene.sound.play(AssetManager.SOUNDS_BUMP_1_KEY);
    }
    private playWallSound() : void  {
        this.scene.sound.play(AssetManager.SOUNDS_BUMP_2_KEY);
    }
    private playNetSound() : void  {
        this.scene.sound.play(AssetManager.SOUNDS_BUMP_3_KEY);
    }

}

export default BallSpeaker;