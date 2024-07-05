
import AssetManager from "../../managers/AssetManager";
import ObstacleBoundaryImage from "./ObstacleBoundaryImage";

class CircleObstacleBoundaryImage extends ObstacleBoundaryImage {
    
    public static readonly BOUND_WIDTH = 105; // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 105; // Height of the bounds, making them tall

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.BASKETS_148_KEY, CircleObstacleBoundaryImage.BOUND_WIDTH, CircleObstacleBoundaryImage.BOUND_HEIGHT, true);
     
        this.setCircle(CircleObstacleBoundaryImage.BOUND_WIDTH / 2);
        console.log("CircleObstacleBoundaryImage");
    }


}



export default CircleObstacleBoundaryImage;

