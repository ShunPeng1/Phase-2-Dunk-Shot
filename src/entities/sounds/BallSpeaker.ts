import { Scene } from "phaser";
import Ball from "../balls/Ball";
import HoopSpawner from "../hoops/HoopSpawner";
import AssetManager from "../../managers/AssetManager";
import BasketballHoop from "../hoops/BasketballHoop";

class BallSpeaker extends Phaser.GameObjects.GameObject {
    private ball : Ball;
    private hoopSpawner : HoopSpawner;

    private perfectCount : number = 0;

    constructor(scene : Scene, ball : Ball, hoopSpawner : HoopSpawner) {
        super(scene, "BallSpeaker");
        this.ball = ball;
    
        this.ball.on(this.ball.RING_HOOP_COLLIDE_EVENT, this.playRingSound.bind(this));
        this.ball.on(this.ball.WALL_COLLIDE_EVENT, this.playWallSound.bind(this));
        this.ball.on(this.ball.NET_COLLIDE_EVENT, this.playNetSound.bind(this));
        this.ball.on(this.ball.COLLECTIBLE_OVERLAP_EVENT, this.playCollectibleSound.bind(this));
        this.ball.on(this.ball.BALL_PUSH_EVENT, this.playPushSound.bind(this));

        this.hoopSpawner = hoopSpawner;

        this.hoopSpawner.subscribeToEnterNextHoop(this.playEnterNextHoopSound.bind(this));
        this.hoopSpawner.subscribeToEnterCurrentHoop(this.playEnterCurrentHoopSound.bind(this));

        
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

    private playCollectibleSound() : void {
        this.scene.sound.play(AssetManager.SOUNDS_STAR_2_KEY);
    }

    private playEnterNextHoopSound(hoop : BasketballHoop, perfectCount: number, bounceCount: number, isBounceWall: boolean, isBounceRing: boolean ) : void {  
        this.perfectCount = perfectCount;
        
        switch(perfectCount) {
            case 0:
                this.scene.sound.play(AssetManager.SOUNDS_NON_PERFECT_KEY);
                break;
            case 1:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_1_KEY);
                break;
            case 2:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_2_KEY);
                break;
            case 3:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_3_KEY);
                break;
            case 4:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_4_KEY);
                break;
            case 5:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_5_KEY);
                break;
            case 6:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_6_KEY);
                break;
            case 7:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_7_KEY);
                break;
            case 8:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_8_KEY);
                break;
            case 9:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_9_KEY);
                break;
            default:
                this.scene.sound.play(AssetManager.SOUNDS_PERFECT_10_KEY);
                break;
        }



        if (isBounceWall) {
            this.scene.sound.play(AssetManager.SOUNDS_BOUNCE_SHOT_KEY);
        }

        if (this.isFireSound()) {
            this.scene.sound.play(AssetManager.SOUNDS_FIRE_3_KEY);
        }
    }

    private playEnterCurrentHoopSound(hoop : BasketballHoop) : void {
        this.scene.sound.play(AssetManager.SOUNDS_HIT_KEY);
    }

    private playPushSound(force: number, angularForce : number, angle : number)  : void {
        console.log(force);
        if (force > 950) {

            if (this.isFireSound()) {
                this.scene.sound.play(AssetManager.SOUNDS_FIRE_4_KEY);
            }
            else{
                this.scene.sound.play(AssetManager.SOUNDS_NET_SHOOT_HARD_KEY);
            }
        }
        else if (force > 700) {
            
            if (this.isFireSound()) {
                this.scene.sound.play(AssetManager.SOUNDS_FIRE_2_KEY);
            }
            else{
                this.scene.sound.play(AssetManager.SOUNDS_NET_SHOOT_MEDIUM_KEY);
            }
        }
        else {
            
            if (this.isFireSound()) {
                this.scene.sound.play(AssetManager.SOUNDS_FIRE_1_KEY);
            }
            else{
                this.scene.sound.play(AssetManager.SOUNDS_NET_SHOOT_LITE_KEY);
            }
        }


    }

    private isFireSound() : boolean {
        return this.perfectCount > 3;
    }
}

export default BallSpeaker;