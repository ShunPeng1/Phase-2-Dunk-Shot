import Ball from "../entities/Ball";
import BasketballHoop from "../entities/BasketballHoop";
import PlayScene from "../scenes/PlayScene";

class GameInputHandler {
    private scene: PlayScene;
    private isDragging: boolean = false;
    private dragStartPoint: Phaser.Math.Vector2;
    private currentHoop: BasketballHoop;
    private ball : Ball;

    private readonly MIN_HOOP_SCALE: number = 1;
    private readonly MAX_HOOP_SCALE: number = 2; 

    private readonly SCALING_FACTOR : number = 0.01;

    private readonly PUSH_BALL_FORCE : number = 600;

    constructor(scene: PlayScene, ball : Ball) {
        this.scene = scene;
        this.ball = ball;
        
        this.dragStartPoint = new Phaser.Math.Vector2();

        // Mouse down event
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.isDragging = true;
            this.dragStartPoint.set(pointer.x, pointer.y);
        });

        // Mouse move event
        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (!this.isDragging) return;
            
            // Scale logic
            let dragDistance = this.calculateScaledDistance();

            // Net scale logic
            this.currentHoop.setNetScale(dragDistance + 1);

            // Rotation logic
            let angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y) - Math.PI / 2;
            this.currentHoop.setRotation(angle);
        
        });

        // Mouse up event
        this.scene.input.on('pointerup', () => {
            this.isDragging = false;
            this.currentHoop.setNetScale(1); // Reset scale

            // Add ball force
            
            let distance = this.calculateScaledDistance();
            let force = this.calculateForce(distance);


            let angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, this.scene.input.activePointer.x, this.scene.input.activePointer.y) + Math.PI ;
            this.ball.setVelocity(force * Math.cos(angle), force * Math.sin(angle));
            

        });
    }


    public setCurrentHoop(hoop: BasketballHoop) : void {
        this.currentHoop = hoop;
    }

    private calculateScaledDistance() : number {
        const distance = Phaser.Math.Distance.Between(this.dragStartPoint.x, this.dragStartPoint.y, this.scene.input.activePointer.x, this.scene.input.activePointer.y);
        const scaledDistance = Phaser.Math.Clamp(distance * this.SCALING_FACTOR, 0, 1);
        return scaledDistance;
    }

    private calculateForce(scaledDistance : number) : number {
        let force = Math.max(scaledDistance, 0) * this.PUSH_BALL_FORCE;
        return force;
    }


    
    
}


export default GameInputHandler;