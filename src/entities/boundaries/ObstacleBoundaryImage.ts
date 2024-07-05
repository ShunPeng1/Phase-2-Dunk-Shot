import BoundaryImage from "./BoundaryImage";

class ObstacleBoundaryImage extends BoundaryImage {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, width: number, height: number) {
        super(scene, x, y, texture, width, height);
    }
}

export default ObstacleBoundaryImage;