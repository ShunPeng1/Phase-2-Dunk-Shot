import BasketballHoop from "./BasketballHoop";
import InternalHoopArcadeImage from "./InternalHoopArcadeImage";
import CustomPhysicGroupContainer from "./physics/CustomPhysicGroupContainer";
import OnePhysicGroupContainer from "./physics/OnePhysicGroupContainer";

class InternalHoopPhysicGroupContainer extends CustomPhysicGroupContainer{
    
    private size: number;

    private basketballHoop: BasketballHoop;
    
    constructor(scene: Phaser.Scene, x: number, y: number, size: number, basketballHoop: BasketballHoop) {
        super(scene, x, y);
        
        this.size = size;

        this.basketballHoop = basketballHoop;

        this.initColliders();

    }

    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        if (!this.basketballHoop) {
            return [];
        }

        const collider = new InternalHoopArcadeImage(this.scene, 0, 0, '', this.basketballHoop)
            .setVisible(false)
            .setCircle(this.size);

        return [collider];
    }
}

export default InternalHoopPhysicGroupContainer;