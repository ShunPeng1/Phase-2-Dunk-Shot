class BoundaryImage extends Phaser.Physics.Arcade.Image {

    public readonly BOUND_WIDTH = 10; // Width of the bounds, making them thin
    public readonly BOUND_HEIGHT = 999999999999; // Height of the bounds, making them tall


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);

        this.setImmovable(true);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        this.setSize(this.BOUND_WIDTH, this.BOUND_HEIGHT);
        this.setVisible(false);


    }

    public enableCollision(collider: Phaser.GameObjects.GameObject): void {

        this.scene.physics.add.collider(collider, this, this.collisionCallback);
    }



    private collisionCallback(other : Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, bound : Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) : void {
        const body = (other as Phaser.Types.Physics.Arcade.GameObjectWithBody).body;
        
        const collisionX = body.x;
        const collisionY = body.y;
        console.log(`Left bound collision at x: ${collisionX}, y: ${collisionY}`);
        // Additional logic for left bound collision can be added here
    };

}

export default BoundaryImage;