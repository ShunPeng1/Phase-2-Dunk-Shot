import ScoreManager from "../../managers/ScoreManager";
import Ball from "../Ball";
import BasketballHoop from "../hoops/BasketballHoop";
import HoopSpawner from "../hoops/HoopSpawner";

class ScoreCounter extends Phaser.Events.EventEmitter {
    private isBounceRing : boolean = false;
    private isBounceWall : boolean = false;

    private prefectCount : number = 0;

    public readonly SCORE_UPDATE_EVENT : string = 'scoreUpdate';

    constructor(spawner : HoopSpawner, ball : Ball) {
        super();
        spawner.subscribeToEnterNextHoop(this.calculateScore.bind(this));
        spawner.subscribeToEnterCurrentHoop(this.resetBounceCount.bind(this));

        ball.on(ball.RING_HOOP_COLLIDE_EVENT, this.setBounceRing.bind(this));
        ball.on(ball.WALL_COLLIDE_EVENT, this.setBounceWall.bind(this));
    }

    
    private calculateScore(hoop : BasketballHoop) : void {
        
        if (this.isBounceRing) {
            this.prefectCount = 0;
        }
        else{
            this.prefectCount++;
        }

        
        let score = Math.min(1 + this.prefectCount, 10);

        if (this.isBounceWall) {
            score = score * 2;
        }

        ScoreManager.getInstance().addScore(score);

        let totalScore = ScoreManager.getInstance().getScore();
        
        this.emit(this.SCORE_UPDATE_EVENT, totalScore, score, this.prefectCount, this.isBounceWall);
    
        
        this.isBounceRing = false;
        this.isBounceWall = false;
    }

    private resetBounceCount() : void {
        this.isBounceWall = false;

    
    }


    private setBounceRing() : void {
        this.isBounceRing = true;
    }

    private setBounceWall() : void {
        this.isBounceWall = true;
    }
    
    
}


export default ScoreCounter;