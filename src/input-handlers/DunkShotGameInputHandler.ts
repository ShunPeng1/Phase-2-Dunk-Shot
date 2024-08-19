import { Scene } from "phaser"
import Ball from "../entities/balls/Ball"
import BasketballHoop from "../entities/hoops/BasketballHoop"
import ITrajectory from "../entities/trajectories/ITrajectory"


class DunkShotGameInputHandler {
    private scene: Scene
    private isDragging = false
    private dragStartPoint: Phaser.Math.Vector2
    private currentHoop: BasketballHoop
    private ball: Ball
    private trajectory : ITrajectory

    private canShoot = false

    private readonly MIN_REQUIRED_SCALED_DISTANCE: number = 0.4

    private readonly SCALING_FACTOR: number = 0.008

    private readonly PUSH_BALL_FORCE: number = 1100
    
    
    constructor(scene: Scene, ball: Ball, trajectory : ITrajectory) {
        this.scene = scene
        this.ball = ball
        this.trajectory = trajectory

        this.dragStartPoint = new Phaser.Math.Vector2()

        
        this.registerInputEvents()
    
    }

    private registerInputEvents() {
        this.scene.input.on('pointerdown', this.onPointerDown.bind(this))
        this.scene.input.on('pointermove', this.onPointerMove.bind(this))
        this.scene.input.on('pointerup', this.onPointerUp.bind(this))
        this.ball.on(this.ball.INTERNAL_HOOP_OVERLAP_START_EVENT, this.onHoopEnter.bind(this))
        this.ball.on(this.ball.INTERNAL_HOOP_OVERLAP_END_EVENT, this.onHoopExit.bind(this))
    }

    private onPointerDown(pointer: Phaser.Input.Pointer) {
        if (!this.canShoot) return

        this.isDragging = true
        this.dragStartPoint.set(pointer.x, pointer.y)

        this.scene.cameras.main.setLerp(0, 0)
    }

    private onPointerMove(pointer: Phaser.Input.Pointer) {
        if (!this.isDragging || !this.canShoot) return

        // Scale logic
        const dragDistance = this.calculateScaledDistance()

        this.adjustHoopAppearance(dragDistance, pointer)
      
        this.updateTrajectory(dragDistance, pointer)
    
    }

    private onPointerUp(pointer: Phaser.Input.Pointer) {
        if (!this.isDragging || !this.canShoot) return

        
        const distance = this.calculateScaledDistance()
        

        this.isDragging = false
        this.trajectory.clear()

        if (distance > this.MIN_REQUIRED_SCALED_DISTANCE) {
            this.launchBall(distance, pointer)
            this.scene.cameras.main.setLerp(0, 0.01)
        }
    }

    private adjustHoopAppearance(dragDistance: number, pointer: Phaser.Input.Pointer) {
        this.currentHoop.setNetScale(dragDistance + 1)
        const angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y)
        this.currentHoop.setRotation(angle - Math.PI / 2)
    }

    private updateTrajectory(dragDistance: number, pointer: Phaser.Input.Pointer) {
        if (dragDistance < this.MIN_REQUIRED_SCALED_DISTANCE) {
            this.trajectory.clear()
            return
        }
        const ballWorldPosition = this.ball.getWorldPosition()
        const angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y)
        this.trajectory.draw(ballWorldPosition, this.calculateForceFromScaleDistance(dragDistance), angle + Math.PI)
    }

    private launchBall(distance: number, pointer: Phaser.Input.Pointer) {
        const force = this.calculateForceFromScaleDistance(distance)
        const angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y) + Math.PI
        this.animateNetScalingBack(() => {
            this.applyBallForce(force, angle)
        })
    }

    private animateNetScalingBack(onComplete: () => void) {
        this.scene.tweens.add({
            targets: this.currentHoop,
            value: { from: this.currentHoop.getCurrentNetScale(), to: 1 },
            duration: 100,
            ease: 'Sine.easeInOut',
            onComplete: onComplete,
            onUpdate: (tween) => {
                const value = tween.getValue()
                this.currentHoop.setNetScale(value)
            }
        })
    }

    private applyBallForce(force: number, angle: number) {
        const internalHoopContainer = this.currentHoop.getInternalHoopContainer()
        internalHoopContainer.remove(this.ball)
        this.ball.unbindBall()
        const worldPosition = this.currentHoop.getInternalHoopWorldPosition()
        this.ball.setPosition(worldPosition.x, worldPosition.y)
        this.ball.pushBall(force, force * 2, angle)
    }

    public setCurrentHoop(hoop: BasketballHoop): void {
        this.currentHoop = hoop
    }

    private onHoopEnter(basketballHoop : BasketballHoop): void {
        this.currentHoop = basketballHoop
        this.prepareBallForShot(basketballHoop)
    }

    private prepareBallForShot(basketballHoop: BasketballHoop) {
        const worldPosition = basketballHoop.getInternalHoopWorldPosition()
        const internalHoopContainer = basketballHoop.getInternalHoopContainer()
        basketballHoop.disableCollision()
        const duration = this.calculateTweenDuration()
        const power = this.ball.arcadeBody.speed / 1000

        this.ball.stableBall()
        this.ball.bindBall(basketballHoop)
        this.moveBallToHoop(worldPosition, duration, () => {
            internalHoopContainer.add(this.ball)
            this.ball.setPosition(0, 0)
            this.canShoot = true

            
            this.resetHoop(basketballHoop, duration, power)
        })

        

    }

    private calculateTweenDuration(): number {
        return Math.min(Math.max(this.ball.arcadeBody.speed / 8, 50), 150)
    }

    private moveBallToHoop(worldPosition: Phaser.Math.Vector2, duration: number, onComplete: () => void) {
        this.scene.tweens.add({
            targets: this.ball,
            x: { from: this.ball.x, to: worldPosition.x },
            y: { from: this.ball.y, to: worldPosition.y },
            duration: duration,
            ease: 'Power2.easeInOut',
            onComplete: onComplete
        })

        
        this.scene.tweens.add({
            targets: this.ball.body,
            angularVelocity: 0,
            duration: duration, 
            ease: 'Sine.easeOut',
        })
    }

    private resetHoop(basketballHoop: BasketballHoop, duration : number, power : number) {        

        //Tween for setting hoop's rotation to 0
        this.scene.tweens.add({
            targets: basketballHoop,
            values: { from: basketballHoop.getRotation(), to: 0},
            duration: duration, // Adjust duration as needed
            ease: 'Quad.easeOut',

            onUpdate: (tween) => {
                const value = tween.getValue()
                basketballHoop.setRotation(value)
            }
        })


        const originalScale = basketballHoop.getCurrentNetScale()
        const maxScale = originalScale * (1+power) // Example scale factor

        this.scene.tweens.add({
            targets: basketballHoop,
            values: { from: originalScale, to: maxScale },
            yoyo: true, // Goes back to original scale
            ease: 'Sine.easeInOut', // This can be adjusted for different effects
            duration: duration, // Duration of one cycle
            onUpdate: (tween) => {
                const value = tween.getValue()
                basketballHoop.setNetScale(value)
            }
        })
    }


    public onHoopExit(basketballHoop : BasketballHoop): void {
        //console.log("Hoop exited");

        this.canShoot = false

        this.currentHoop.enableCollision(this.ball, this.ball.hoopCollisionCallback)
        this.currentHoop.enableOverlap(this.ball, this.ball.internalHoopOverlapCallback)
    }

    private calculateScaledDistance(): number {
        const distance = Phaser.Math.Distance.Between(this.dragStartPoint.x, this.dragStartPoint.y, this.scene.input.activePointer.x, this.scene.input.activePointer.y)
        const scaledDistance = Phaser.Math.Clamp(distance * this.SCALING_FACTOR, 0, 1)
        return scaledDistance
    }

    private calculateForceFromScaleDistance(scaledDistance: number): number {
        const force = Math.max(scaledDistance, 0) * this.PUSH_BALL_FORCE
        return force
    }
}

export default DunkShotGameInputHandler