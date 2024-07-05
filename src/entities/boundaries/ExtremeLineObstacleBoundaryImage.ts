import { Physics } from "phaser";
import HoopSpawner from "../hoops/HoopSpawner";
import BasketballHoop from "../hoops/BasketballHoop";
import BallInteraction from "../balls/BallInteraction";
import BoundaryImage from "./BoundaryImage";
import AssetManager from "../../managers/AssetManager";
import ObstacleBoundaryImage from "./ObstacleBoundaryImage";

class ExtremeLineObstacleBoundaryImage extends ObstacleBoundaryImage {
    
    public static readonly BOUND_WIDTH = 25; // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 416; // Height of the bounds, making them tall

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.BASKETS_144_KEY, ExtremeLineObstacleBoundaryImage.BOUND_WIDTH, ExtremeLineObstacleBoundaryImage.BOUND_HEIGHT);
     
    }


}



export default ExtremeLineObstacleBoundaryImage;

