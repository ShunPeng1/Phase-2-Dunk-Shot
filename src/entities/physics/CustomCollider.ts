abstract class CustomCollider extends Phaser.GameObjects.Container{
  
    protected colliders : Phaser.Physics.Arcade.Group;
    constructor(scene : Phaser.Scene, x? : number, y? : number) {
        super(scene, x, y);
    }

    protected initColliders(): void {
        const colliderChildren = this.createColliderChildren();
        this.colliders = this.scene.physics.add.group(colliderChildren);
        this.add(colliderChildren);
    }

    protected abstract createColliderChildren() : Phaser.GameObjects.GameObject[];

    public enableCollision(collider : Phaser.GameObjects.GameObject) : void {
        this.scene.physics.add.collider(collider, this.colliders);
    }
    
    public setImmovable(value: boolean) : void {
        this.colliders.getChildren().forEach(collider => {
            (collider as unknown as Phaser.Physics.Arcade.Components.Immovable).setImmovable(value);
        });
    }

    public setPushable(value: boolean) : void {
        this.colliders.getChildren().forEach(collider => {
            (collider as unknown as Phaser.Physics.Arcade.Components.Pushable).setPushable(value);
        });
    }

    public setGravity(valueX : number, valueY : number) : void {
        this.colliders.getChildren().forEach(collider => {
            (collider as unknown as Phaser.Physics.Arcade.Components.Gravity).setGravity(valueX, valueY);
        });
    }

    public setAllowGravity(value: boolean) : void {
        this.colliders.getChildren().forEach(collider => {
            (collider as any).body.setAllowGravity(value);
        });
    }


    public getColliders() : Phaser.Physics.Arcade.Group {
        return this.colliders;
    }

}

export default CustomCollider;