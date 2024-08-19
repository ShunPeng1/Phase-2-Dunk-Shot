import { Scene } from "phaser"
import BasketballHoop from "./BasketballHoop"

class HoopFactory {
    private scene : Scene
    private hoopTintColor : number
    private hoopScale : number

    constructor(scene : Scene, hoopTintColor : number, hoopScale : number) {
        this.scene = scene
        this.hoopTintColor = hoopTintColor
        this.hoopScale = hoopScale
    }


    public createHoop(hoopType: HoopType, x : number, y : number) : BasketballHoop {
        
        let hoop : BasketballHoop
        switch (hoopType) {
            case BasketballHoop:
                hoop = new BasketballHoop(this.scene, x, y)
                break
            default:
                hoop = new BasketballHoop(this.scene, x, y)
                break
        }

        hoop.setRingTint(this.hoopTintColor)
        hoop.setScale(this.hoopScale)

        return hoop

    }

}


export default HoopFactory