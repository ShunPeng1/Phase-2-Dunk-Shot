import { GameObjects } from "phaser";
import HoopSpawner from "../hoops/HoopSpawner";
import Ball from "./Ball";
import FireTrail from "../particles/FireTrail";
import BasketballHoop from "../hoops/BasketballHoop";
import SmokeTrail from "../particles/SmokeTrail";

class BallParticle extends GameObjects.GameObject {
    private fireTrail: FireTrail;
    private smokeTrail: SmokeTrail;

    private perfectCount : number = 0;
    private isBounceRing : boolean = false;

    constructor(scene: Phaser.Scene, type: string, ball: Ball, spawner: HoopSpawner, follower : GameObjects.Graphics){
        
        super(scene, type);
        
        //this.scene.add.existing(this);

        spawner.subscribeToEnterNextHoop(this.countPerfect.bind(this));

        ball.on(ball.RING_HOOP_COLLIDE_EVENT, this.setBounceRing.bind(this));

        this.fireTrail = new FireTrail(scene, 0,0, follower);
        this.smokeTrail = new SmokeTrail(scene, 0,0, follower);

        this.scene.add.existing(this.fireTrail);
        this.scene.add.existing(this.smokeTrail);

    
        
    }

    

    private countPerfect(hoop : BasketballHoop) : void {
        
        if (this.isBounceRing) {
            this.perfectCount = 0;
        }
        else{
            this.perfectCount++;
        }

        if (this.perfectCount == 2) {
            this.smokeTrail.start();
            
        }
        else if (this.perfectCount > 2) {
            this.fireTrail.start();
            this.smokeTrail.stop();
        }
        

        
        this.isBounceRing = false;
    }

    private setBounceRing() : void {
        this.isBounceRing = true;

        this.fireTrail.stop();
        this.smokeTrail.stop();

    }
}

export default BallParticle;