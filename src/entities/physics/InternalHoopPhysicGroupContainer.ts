
import BasketballHoop from "../hoops/BasketballHoop"
import InternalHoopArcadeImage from "../hoops/InternalHoopArcadeImage"
import CustomPhysicGroupContainer from "./CustomPhysicGroupContainer"


class InternalHoopPhysicGroupContainer extends CustomPhysicGroupContainer{
    
    private size: number

    private basketballHoop: BasketballHoop
    
    constructor(scene: Phaser.Scene, x: number, y: number, size: number, basketballHoop: BasketballHoop) {
        super(scene, x, y)
        
        this.size = size

        this.basketballHoop = basketballHoop

        this.initColliders()

    }

    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        if (!this.basketballHoop) {
            return []
        }

        const collider = new InternalHoopArcadeImage(this.scene, 0, 0, '', this.basketballHoop)
            .setVisible(false)
            .setCircle(this.size)

        return [collider]
    }
}

export default InternalHoopPhysicGroupContainer