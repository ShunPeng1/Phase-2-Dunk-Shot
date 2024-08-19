import { Scene } from "phaser"
import ObstacleBoundaryImage from "./ObstacleBoundaryImage"
import SmallLineObstacleBoundaryImage from "./SmallLineObstacleBoundaryImage"
import MediumLineObstacleBoundaryImage from "./MediumLineObstacleBoundaryImage"
import ExtremeLineObstacleBoundaryImage from "./ExtremeLineObstacleBoundaryImage"
import LongLineObstacleBoundaryImage from "./LongLineObstacleBoundaryImage"
import CircleObstacleBoundaryImage from "./CircleObstacleBoundaryImage"

class ObstacleFactory {
    private scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
    }

    public createObstacle(obstacleType: ObstacleType, x: number, y: number): ObstacleBoundaryImage {
        let obstacle: ObstacleBoundaryImage

        switch (obstacleType) {
            case SmallLineObstacleBoundaryImage:
                obstacle = new SmallLineObstacleBoundaryImage(this.scene, x, y)
                break
            case MediumLineObstacleBoundaryImage:
                obstacle = new MediumLineObstacleBoundaryImage(this.scene, x, y)
                break
            case LongLineObstacleBoundaryImage:
                obstacle = new LongLineObstacleBoundaryImage(this.scene, x, y)
                break
            case ExtremeLineObstacleBoundaryImage:
                obstacle = new ExtremeLineObstacleBoundaryImage(this.scene, x, y)
                break
            case CircleObstacleBoundaryImage:
                obstacle = new CircleObstacleBoundaryImage(this.scene, x, y)
                break
            default:
                throw new Error("Invalid obstacle type")
        }

        return obstacle
    }
}



export default ObstacleFactory