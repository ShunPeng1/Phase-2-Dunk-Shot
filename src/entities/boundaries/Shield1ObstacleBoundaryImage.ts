
import AssetManager from "../../managers/AssetManager"
import LinePhysicGroupContainer from "../physics/LinePhysicGroupContainer"
import ObstacleBoundaryImage from "./ObstacleBoundaryImage"

class Shield1ObstacleBoundaryImage extends ObstacleBoundaryImage {
    
    private static readonly RADIUS = 380/2
    private static readonly rotationSpeed : number = 10
    private lineContainer : LinePhysicGroupContainer

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, AssetManager.SHIELD_1_KEY, 0, 0, true)
     
        this.lineContainer = new LinePhysicGroupContainer(scene, x, y, -Shield1ObstacleBoundaryImage.RADIUS, +Shield1ObstacleBoundaryImage.RADIUS, (x : number) => {
            return -Math.sqrt(Math.pow(Shield1ObstacleBoundaryImage.RADIUS, 2) - Math.pow(x, 2))
        }, 10, 10, {
            type: 'none',
            key: AssetManager.SHIELD_1_KEY
        })

        this.lineContainer.setOrigin(0.5, 0.5)
        this.lineContainer.setAllowGravity(false)
        scene.add.existing(this.lineContainer)
            
    }

    public update(time: number, delta: number): void {
        // Convert rotationSpeed from degrees to radians (if necessary)
        const rotationSpeedRadians = Phaser.Math.DegToRad(Shield1ObstacleBoundaryImage.rotationSpeed)
    
        // Update the rotation based on the delta time to ensure smooth, time-based rotation
        this.rotation += rotationSpeedRadians * (delta / 1000)
    
        // Apply the updated rotation to the lineContainer
        this.lineContainer.setRotation(this.rotation)
    }
    

    public enableCollision(collider: Phaser.GameObjects.GameObject, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback): void {

        this.scene.physics.add.collider(collider, this, 
            (object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void => {
                this.hit(object1)
                
                if (callback) {
                    callback(object1, object2)
                }
            }
            , undefined, this.scene)

        
    }

}



export default Shield1ObstacleBoundaryImage

