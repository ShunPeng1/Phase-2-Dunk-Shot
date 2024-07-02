import AssetManager from "../../managers/AssetManager";
import Ball from "../Ball";
import BoundaryImage from "./BoundaryImage";

class WallBoundaryImage extends BoundaryImage {
    
    public static readonly BOUND_WIDTH = 10; // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 100000000; // Height of the bounds, making them tall

    private impactScale = 0.3;

    private isLeft: boolean;

    private topImpactImage: Phaser.GameObjects.Image;
    private bottomImpactImage: Phaser.GameObjects.Image;
    private middleImpactImage: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number, isLeft: boolean) {
        super(scene, x, y, "", WallBoundaryImage.BOUND_WIDTH, WallBoundaryImage.BOUND_HEIGHT);
        
        
        this.isLeft = isLeft;


        
        this.topImpactImage = scene.add.image(x, y, AssetManager.TOP_IMPACT_KEY);
        this.topImpactImage.setTint(0xff8b00);
        this.topImpactImage.setScale(0.3);
        this.topImpactImage.setOrigin(0.5, 1);
        this.topImpactImage.setVisible(false);
        this.topImpactImage.setDepth(5);
        this.topImpactImage.setBlendMode(Phaser.BlendModes.DIFFERENCE);

        this.bottomImpactImage = scene.add.image(x, y, AssetManager.BOTTOM_IMPACT_KEY);
        this.bottomImpactImage.setTint(0xff8b00);
        this.bottomImpactImage.setScale(0.3);
        this.bottomImpactImage.setOrigin(0.5, 0);
        this.bottomImpactImage.setVisible(false);
        this.bottomImpactImage.setDepth(5);
        this.bottomImpactImage.setBlendMode(Phaser.BlendModes.DIFFERENCE);

        this.middleImpactImage = scene.add.image(x, y, AssetManager.MIDDLE_IMPACT_KEY);
        this.middleImpactImage.setTint(0xff8b00);
        this.middleImpactImage.setScale(0.3);
        this.middleImpactImage.setVisible(false);
        this.middleImpactImage.setDepth(5);
        this.middleImpactImage.setBlendMode(Phaser.BlendModes.DIFFERENCE);


    }

    public hit(object1?: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody | undefined): void {
        if (object1 instanceof Ball){
            const worldPosition = object1.getWorldPosition();
                
            const duration = 150;
            // Make the middleImpactImage visible and scale it larger in the Y direction
    

            const offset = -10;
            if (this.isLeft) {
                this.tweenImpact(this.topImpactImage, this.x - offset, worldPosition.y, 0, 1.5, duration);
                this.tweenImpact(this.bottomImpactImage, this.x - offset, worldPosition.y, 0, 1.5, duration);
                this.tweenImpact(this.middleImpactImage, this.x - offset, worldPosition.y, 0, 1, duration);     
                
            } else {
                this.tweenImpact(this.topImpactImage, this.x + offset, worldPosition.y, 180, 1.5, duration);
                this.tweenImpact(this.bottomImpactImage, this.x + offset, worldPosition.y, 180, 1.5, duration);
                this.tweenImpact(this.middleImpactImage, this.x + offset, worldPosition.y, 180, 1, duration);
            }
            

        }

        
    }
    
    private tweenImpact(image: Phaser.GameObjects.Image, x: number, y: number, rotation: number, scaleValue : number, duration: number): void {
            image.setRotation(Phaser.Math.DegToRad(rotation));
            image.setPosition(x, y);
            image.setVisible(true);
            image.setScale(this.impactScale);

            // Create a tween for the appearance and scaling
            this.scene.tweens.add({
                targets: image,
                scaleY: scaleValue, // Scale larger in the Y direction
                duration: duration, // Duration of the animation in milliseconds
                ease: 'Sine.easeInOut', // Easing function for the animation
                onComplete: () => {
                    // Reset the image properties after the animation completes
                }
            });

            this.scene.tweens.add({
                targets: image,
                alpha: { from: 0, to: 1 }, // Make it appear
                duration: duration, // Duration of the animation in milliseconds
                yoyo: true,
                ease: 'Sine.easeInOut', // Easing function for the animation
                onComplete: () => {
                    this.middleImpactImage.setAlpha(0);
                    this.middleImpactImage.setVisible(false);
                    
                    this.middleImpactImage.setScale(this.impactScale);
                }
            });

        }


}

export default WallBoundaryImage;