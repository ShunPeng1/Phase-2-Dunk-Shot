import { Physics } from "phaser";
import HoopSpawner from "../hoops/HoopSpawner";
import BasketballHoop from "../hoops/BasketballHoop";
import BallInteraction from "../balls/BallInteraction";
import BoundaryImage from "./BoundaryImage";
import AssetManager from "../../managers/AssetManager";

class SmallLineObstacleBoundaryImage extends BoundaryImage {
    
    public static readonly BOUND_WIDTH = 20; // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 180; // Height of the bounds, making them tall

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.BASKETS_24_KEY, SmallLineObstacleBoundaryImage.BOUND_WIDTH, SmallLineObstacleBoundaryImage.BOUND_HEIGHT);
     
    }

}



export default SmallLineObstacleBoundaryImage;

