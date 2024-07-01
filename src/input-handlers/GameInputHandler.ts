import Ball from "../entities/Ball";
import BasketballHoop from "../entities/hoops/BasketballHoop";
import ITrajectory from "../entities/trajectories/ITrajectory";
import GameScene from "../scenes/GameScene";


class GameInputHandler {
    private scene: GameScene;
    private isDragging: boolean = false;
    private dragStartPoint: Phaser.Math.Vector2;
    private currentHoop: BasketballHoop;
    private ball: Ball;
    private trajectory : ITrajectory;

    private canShoot: boolean = false;

    private readonly MIN_REQUIRED_SCALED_DISTANCE: number = 0.4;

    private readonly SCALING_FACTOR: number = 0.008;

    private readonly PUSH_BALL_FORCE: number = 1100;
    
    
    constructor(scene: GameScene, ball: Ball, trajectory : ITrajectory) {
        this.scene = scene;
        this.ball = ball;
        this.trajectory = trajectory;

        this.dragStartPoint = new Phaser.Math.Vector2();

        // Mouse down event
        this.scene.input.on('pointerdown', this.onPointerDown.bind(this));

        // Mouse move event
        this.scene.input.on('pointermove', this.onPointerMove.bind(this));

        // Mouse up event
        this.scene.input.on('pointerup', this.onPointerUp.bind(this));

        // Overlap events
        
        this.ball.on(this.ball.INTERNAL_HOOP_OVERLAP_START_EVENT, this.onHoopEnter.bind(this));
        this.ball.on(this.ball.INTERNAL_HOOP_OVERLAP_END_EVENT, this.onHoopExit.bind(this));
    }

    private onPointerDown(pointer: Phaser.Input.Pointer) {
        if (!this.canShoot) return;

        this.isDragging = true;
        this.dragStartPoint.set(pointer.x, pointer.y);
    }

    private onPointerMove(pointer: Phaser.Input.Pointer) {
        if (!this.isDragging || !this.canShoot) return;

        // Scale logic
        let dragDistance = this.calculateScaledDistance();

        // Net scale logic
        this.currentHoop.setNetScale(dragDistance + 1);

        // Rotation logic
        let angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y);
        this.currentHoop.setRotation(angle  - Math.PI / 2);

        // Draw trajectory

        if (this.MIN_REQUIRED_SCALED_DISTANCE > dragDistance) {
            this.trajectory.clear();
            return;
        }

        const ballWorldPosition = this.ball.getWorldPosition();
        this.trajectory.draw(ballWorldPosition, this.calculateForceFromScaleDistance(dragDistance), angle + Math.PI);
    }

    private onPointerUp(pointer: Phaser.Input.Pointer) {
        if (!this.isDragging || !this.canShoot) return;

        
        let distance = this.calculateScaledDistance();
        

        this.isDragging = false;
        this.currentHoop.setNetScale(1); // Reset scale
        this.trajectory.clear();

        if (this.MIN_REQUIRED_SCALED_DISTANCE > distance) {
            return;
        }

        // Add ball force
        let force = this.calculateForceFromScaleDistance(distance);
        let angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, this.scene.input.activePointer.x, this.scene.input.activePointer.y) + Math.PI;
        
        
        const internalHoopContainer = this.currentHoop.getInternalHoopContainer();
        internalHoopContainer.remove(this.ball);

        this.ball.unbindBall();
        
        // Reset Position of ball
        let worldPosition = this.currentHoop.getInternalHoopWorldPosition();
        this.ball.x = worldPosition.x;
        this.ball.y = worldPosition.y;

        
        this.ball.pushBall(force, force * 2, angle);
    }

    public setCurrentHoop(hoop: BasketballHoop): void {
        this.currentHoop = hoop;
    }

    private onHoopEnter(basketballHoop : BasketballHoop): void {
        this.canShoot = true;
        
        this.currentHoop = basketballHoop;

        this.ball.stableBall();
        
        const internalHoopContainer = basketballHoop.getInternalHoopContainer();

        internalHoopContainer.add(this.ball);
        this.ball.x = 0;
        this.ball.y = 0;

        basketballHoop.disableCollision();

    }

    public onHoopExit(basketballHoop : BasketballHoop): void {
        console.log("Hoop exited");

        this.canShoot = false;

        this.currentHoop.enableCollision(this.ball);
        this.currentHoop.enableOverlap(this.ball, this.ball.internalHoopOverlapCallback);
    }

    private calculateScaledDistance(): number {
        const distance = Phaser.Math.Distance.Between(this.dragStartPoint.x, this.dragStartPoint.y, this.scene.input.activePointer.x, this.scene.input.activePointer.y);
        const scaledDistance = Phaser.Math.Clamp(distance * this.SCALING_FACTOR, 0, 1);
        return scaledDistance;
    }

    private calculateForceFromScaleDistance(scaledDistance: number): number {
        let force = Math.max(scaledDistance, 0) * this.PUSH_BALL_FORCE;
        return force;
    }
}

export default GameInputHandler;