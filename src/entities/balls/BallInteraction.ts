import Phaser from 'phaser'
import BasketballHoop from "../hoops/BasketballHoop"
import Ball from "./Ball"

class BallInteraction extends Phaser.Events.EventEmitter {
    private ball: Ball
    private nextHoop: BasketballHoop
    private currentHoop: BasketballHoop | null = null
    private goalHoop: BasketballHoop | null = null
    private isBounceRing = false
    private isBounceWall = false
    private bounceCount = 0
    private perfectCount = 0
    private isFirstHoopExist = false

    // Define event names as constants
    public static readonly ENTER_NEXT_HOOP_EVENT = 'enterNextHoop'
    public static readonly ENTER_CURRENT_HOOP_EVENT = 'enterCurrentHoop'
    public static readonly ENTER_GOAL_HOOP_EVENT = 'enterGoalHoop'

    constructor(ball: Ball, firstHoop: BasketballHoop | null = null, goalHoop: BasketballHoop | null = null) {
        super()
        this.ball = ball
        
        if (firstHoop) {
            this.setFirstHoop(firstHoop)
        }
        this.goalHoop = goalHoop
        

        this.ball.on(ball.INTERNAL_HOOP_OVERLAP_START_EVENT, this.checkEnterNextHoop, this)
        this.ball.on(ball.RING_HOOP_COLLIDE_EVENT, this.setBounceRing.bind(this))
        this.ball.on(ball.WALL_COLLIDE_EVENT, this.setBounceWall.bind(this))
    }

    private checkEnterNextHoop(enterHoop: BasketballHoop): void {
        if (this.nextHoop === enterHoop) {
            if (this.isBounceRing) {
                this.perfectCount = 0
            } else {
                this.perfectCount++
            }

            this.emit(BallInteraction.ENTER_NEXT_HOOP_EVENT, enterHoop, this.currentHoop, this.perfectCount, this.bounceCount, this.isBounceWall, this.isBounceRing)

            this.isBounceRing = false
            this.isBounceWall = false


            // Check if the entered hoop is the goal hoop
            if (this.goalHoop === enterHoop) {
                this.emit(BallInteraction.ENTER_GOAL_HOOP_EVENT, enterHoop)
            }
        } else {
            this.isBounceWall = false
            this.bounceCount = 0
            this.emit(BallInteraction.ENTER_CURRENT_HOOP_EVENT, enterHoop)
        }
    }

    public setCurrentHoop(hoop: BasketballHoop): void {
        this.currentHoop = hoop
    }

    public setNextHoop(hoop: BasketballHoop): void {
        this.nextHoop = hoop
    }

    public setFirstHoop(hoop: BasketballHoop): void {
        this.currentHoop = hoop
        this.isFirstHoopExist = true
    }
    
    public setGoalHoop(hoop: BasketballHoop): void {
        this.goalHoop = hoop
    }

    public advanceNextHoop(hoop: BasketballHoop): void {
        this.currentHoop = this.nextHoop
        this.isFirstHoopExist = false
        this.nextHoop = hoop
    }

    public getFirstHoopExist(): boolean {
        return this.isFirstHoopExist
    }

    public getFirstHoop(): BasketballHoop | null {
        if (this.isFirstHoopExist) {
            return this.currentHoop
        }
        return null
    }

    public getGoalHoop(): BasketballHoop | null {
        return this.goalHoop
    }

    private setBounceRing(): void {
        this.isBounceRing = true
    }

    private setBounceWall(): void {
        this.isBounceWall = true
        this.bounceCount++
    }
}

export default BallInteraction