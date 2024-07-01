import { Scene } from "phaser";
import IUiScalable from "./types/IUiScalable";
import IUiHoverable from "./types/IUiHoverable";
import IUi from "./types/IUi";

class UiImage extends Phaser.GameObjects.Image implements IUi, IUiScalable {
    public ratio: number;

    constructor(scene: Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);

        this.scene.scale.on('resize', this.scaleImage, this);

        this.setScrollFactor(0,0);

    }

    scaleImage() {
        // Example scaling factor, adjust based on your needs
        //const scaleFactor = Math.min(this.scene.scale.width / 800, this.scene.scale.height / 600);
        //this.setScale(scaleFactor);
        
        // Update position based on scaled size
        //this.updateImagePosition();
    }

    updateImagePosition() {
        // Make the image follow the camera, adjusting for the desired screen position
        //this.x = this.cameras.main.scrollX + this.scale.width / 2;
        //this.y = this.cameras.main.scrollY + 100; // Adjust Y position as needed
    }


    setRatio(ratio: number): void {
        this.setScale(ratio);
    }
}



export default UiImage;