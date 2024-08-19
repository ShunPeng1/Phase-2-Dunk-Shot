import AssetManager from "../../managers/AssetManager"
import ObstacleBoundaryImage from "./ObstacleBoundaryImage"

class LongLineObstacleBoundaryImage extends ObstacleBoundaryImage {
    
    public static readonly BOUND_WIDTH = 24 // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 346 // Height of the bounds, making them tall

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.BASKETS_208_KEY, LongLineObstacleBoundaryImage.BOUND_WIDTH, LongLineObstacleBoundaryImage.BOUND_HEIGHT)
     
    }

}



export default LongLineObstacleBoundaryImage

