import BasketballHoop from "../entities/BasketballHoop";
import PlayScene from "../scenes/PlayScene";

class GameInputHandler {
    private scene: PlayScene;
    private isDragging: boolean = false;
    private dragStartPoint: Phaser.Math.Vector2;
    private currentHoop: BasketballHoop;

    private readonly MIN_HOOP_SCALE: number = 1; // Example min scale
    private readonly MAX_HOOP_SCALE: number = 2; // Example max scale

    constructor(scene: PlayScene) {
        this.scene = scene;
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
            let dragDistance = Phaser.Math.Distance.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y);
            let newScale = 1 + dragDistance / 100; // Example scaling factor
            newScale = Phaser.Math.Clamp(newScale, this.MIN_HOOP_SCALE, this.MAX_HOOP_SCALE); // Clamp the scale value
            this.currentHoop.setNetScale(newScale);

            // Rotation logic
            let angle = Phaser.Math.Angle.Between(this.dragStartPoint.x, this.dragStartPoint.y, pointer.x, pointer.y) - Math.PI / 2;
            this.currentHoop.setRotation(angle);
        
        });

        // Mouse up event
        this.scene.input.on('pointerup', () => {
            this.isDragging = false;
            this.currentHoop.setNetScale(1); // Reset scale
        });
    }


    public setCurrentHoop(hoop: BasketballHoop) : void {
        this.currentHoop = hoop;
    }


}


export default GameInputHandler;