import BasketballHoop from "../hoops/BasketballHoop";

class Collectible extends Phaser.Physics.Arcade.Image {
    protected basketballHoop: BasketballHoop;
    protected arcadeBody: Phaser.Physics.Arcade.Body;

    protected overlapCollider : Phaser.Physics.Arcade.Collider;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, basketballHoop: BasketballHoop) {
        super(scene, x, y, texture);
        this.basketballHoop = basketballHoop;

        
        // Add this Collectible to the physics world
        scene.physics.world.enable(this);

        this.arcadeBody = this.body as Phaser.Physics.Arcade.Body;


        // Now, you can directly access `this.body` which is automatically created
        this.arcadeBody.setAllowGravity(false);
    }

    public enableOverlap(collider: Phaser.GameObjects.GameObject, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) {
        // Correctly use `this` as the second argument for overlap
        this.overlapCollider = this.scene.physics.add.overlap(collider, this, 
            (object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void =>{
                
                this.collect(object1);

                if (callback) {
                    callback(object1, object2);
                }

        } , undefined, this);
    }

    
    public disableOverlap() {
        this.scene.physics.world.removeCollider(this.overlapCollider);
    }


    public collect(collector?: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        // Implement this method in the child class
    }
}

export default Collectible;