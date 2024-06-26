import CustomPhysicGroupContainer from "./CustomPhysicGroupContainer";

class RingPhysicGroupContainer extends CustomPhysicGroupContainer {
    

    private radiusX: number;
    private radiusY: number;
    private size: number;

    constructor(scene : Phaser.Scene, x : number, y : number, radiusX : number, radiusY : number, size : number) {
        super(scene, x, y);

        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.size = size;

        this.initColliders();
    }
    
    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        const collider1 = this.scene.physics.add.image( -this.radiusX, -this.radiusY, '')
            .setVisible(false)
            .setCircle(this.size);

        const collider2 = this.scene.physics.add.image( this.radiusX, this.radiusY, '')
            .setVisible(false)
            .setCircle(this.size);
        
        return [collider1, collider2];
    }
}

export default RingPhysicGroupContainer;