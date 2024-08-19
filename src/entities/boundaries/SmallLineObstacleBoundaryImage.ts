import AssetManager from "../../managers/AssetManager"
import ObstacleBoundaryImage from "./ObstacleBoundaryImage"

class SmallLineObstacleBoundaryImage extends ObstacleBoundaryImage {
    
    public static readonly BOUND_WIDTH = 24 // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 180 // Height of the bounds, making them tall

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.BASKETS_24_KEY, SmallLineObstacleBoundaryImage.BOUND_WIDTH, SmallLineObstacleBoundaryImage.BOUND_HEIGHT)
     
    }

}



export default SmallLineObstacleBoundaryImage

