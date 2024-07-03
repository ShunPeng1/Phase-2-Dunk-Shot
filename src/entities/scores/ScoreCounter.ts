import ScoreManager from "../../managers/ScoreManager";
import Ball from "../balls/Ball";
import BasketballHoop from "../hoops/BasketballHoop";
import HoopSpawner from "../hoops/HoopSpawner";

class ScoreCounter extends Phaser.Events.EventEmitter {
   

    public readonly SCORE_UPDATE_EVENT : string = 'scoreUpdate';

    constructor(spawner : HoopSpawner, ball : Ball) {
        super();
        spawner.subscribeToEnterNextHoop(this.calculateScore.bind(this));
        
    }
    
    private calculateScore(hoop : BasketballHoop, perfectCount : number, bounceCount : number, isBounceWall : boolean, isBounceRing : boolean) : void {
        
        let score = Math.min(1 + perfectCount, 10);

        if (isBounceWall) {
            score = score * 2;
        }

        ScoreManager.getInstance().addScore(score);

        let totalScore = ScoreManager.getInstance().getScore();
        
        this.emit(this.SCORE_UPDATE_EVENT, totalScore, score, perfectCount, isBounceWall);
    
        

    }
    
}


export default ScoreCounter;