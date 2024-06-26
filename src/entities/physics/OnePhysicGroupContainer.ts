import CustomPhysicGroupContainer from "./CustomPhysicGroupContainer";

class OnePhysicGroupContainer extends CustomPhysicGroupContainer {

    protected size: number;
    constructor(scene : Phaser.Scene, x : number, y : number, size : number) {
        super(scene, x, y);

        this.size = size;

        this.initColliders();
    }

    
    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        const collider = this.scene.physics.add.image(0,0, '')
            .setVisible(false)
            .setCircle(this.size);

        return [collider];
    }
}

export default OnePhysicGroupContainer;