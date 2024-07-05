class BoundaryImage extends Phaser.Physics.Arcade.Image {
    protected vericalWidth: number;
    protected verticalHeight: number;
    protected isCircle: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, width: number, height: number, isCircle: boolean = false) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);

        this.setImmovable(true);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        if (isCircle) {
            this.setCircle(width / 2);
        } else {
            this.setSize(width, height);
        }

        this.vericalWidth = width;
        this.verticalHeight = height;
        this.isCircle = isCircle;

    }

    public enableCollision(collider: Phaser.GameObjects.GameObject, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback): void {

        this.scene.physics.add.collider(collider, this, 
            (object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void => {
                this.hit(object1);
                
                if (callback) {
                    callback(object1, object2);
                }
            }
            , undefined, this.scene);
    }

    public hit(object1?: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
        // Implement this method in the child class
    }


    // private collisionCallback(other : Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, bound : Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) : void {
    //     const body = (other as Phaser.Types.Physics.Arcade.GameObjectWithBody).body;
        
    //     const collisionX = body.x;
    //     const collisionY = body.y;
    //     console.log(`Left bound collision at x: ${collisionX}, y: ${collisionY}`);
    //     // Additional logic for left bound collision can be added here
    // };

}

export default BoundaryImage;