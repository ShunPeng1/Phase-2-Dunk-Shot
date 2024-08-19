import ScoreManager from "../../managers/ScoreManager"
import BallInteraction from "../balls/BallInteraction"
import BasketballHoop from "../hoops/BasketballHoop"

class ScoreCounter extends Phaser.Events.EventEmitter {
   

    public readonly SCORE_UPDATE_EVENT : string = 'scoreUpdate'

    constructor(ballInteraction : BallInteraction) {
        super()
        ballInteraction.on(BallInteraction.ENTER_NEXT_HOOP_EVENT, this.calculateScore.bind(this))
        
    }
    
    private calculateScore(hoop : BasketballHoop, lastHoop : BasketballHoop, perfectCount : number, bounceCount : number, isBounceWall : boolean, _isBounceRing : boolean) : void {
        
        let score = Math.min(1 + perfectCount, 10)

        if (isBounceWall) {
            score = score * 2
        }

        ScoreManager.getInstance().addScore(score)

        const totalScore = ScoreManager.getInstance().getScore()
        
        this.emit(this.SCORE_UPDATE_EVENT, totalScore, score, perfectCount, isBounceWall)
    
        

    }
    
}


export default ScoreCounter