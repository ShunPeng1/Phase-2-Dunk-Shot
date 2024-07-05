import { Physics } from "phaser";
import HoopSpawner from "../hoops/HoopSpawner";
import BasketballHoop from "../hoops/BasketballHoop";
import BallInteraction from "../balls/BallInteraction";
import BoundaryImage from "./BoundaryImage";
import AssetManager from "../../managers/AssetManager";
import ObstacleBoundaryImage from "./ObstacleBoundaryImage";

class MediumLineObstacleBoundaryImage extends ObstacleBoundaryImage {
    
    public static readonly BOUND_WIDTH = 24; // Width of the bounds, making them thin
    public static readonly BOUND_HEIGHT = 277; // Height of the bounds, making them tall

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.BASKETS_182_KEY, MediumLineObstacleBoundaryImage.BOUND_WIDTH, MediumLineObstacleBoundaryImage.BOUND_HEIGHT);
        this.setOrigin(0.5, 0.5);
    }

}



export default MediumLineObstacleBoundaryImage;

