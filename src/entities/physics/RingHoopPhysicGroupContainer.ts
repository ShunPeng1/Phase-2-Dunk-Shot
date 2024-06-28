import BasketballHoop from "../hoops/BasketballHoop";
import RingHoopArcadeImage from "../hoops/RingHoopArcadeImage";
import CustomPhysicGroupContainer from "./CustomPhysicGroupContainer";

class RingHoopPhysicGroupContainer extends CustomPhysicGroupContainer {
    

    private radiusX: number;
    private radiusY: number;
    private size: number;

    private basketballHoop: BasketballHoop;

    constructor(scene : Phaser.Scene, x : number, y : number, radiusX : number, radiusY : number, size : number, basketballHoop: BasketballHoop) {
        super(scene, x, y);

        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.size = size;
        this.basketballHoop = basketballHoop;

        this.initColliders();
    }
    
    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        const collider1 = new RingHoopArcadeImage(this.scene, -this.radiusX, -this.radiusY, '', this.basketballHoop)
        .setVisible(false)
        .setCircle(this.size);

        const collider2 = new RingHoopArcadeImage(this.scene, this.radiusX, this.radiusY, '', this.basketballHoop)
        .setVisible(false)
        .setCircle(this.size);

        
        return [collider1, collider2];
    }
}

export default RingHoopPhysicGroupContainer;