import BasketballHoop from "./BasketballHoop"

class RingHoopArcadeImage extends Phaser.Physics.Arcade.Image {
    private basketballHoop: BasketballHoop

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, basketballHoop: BasketballHoop) {
        super(scene, x, y, '')
        
        scene.physics.add.existing(this) // Add to physics world

        this.basketballHoop = basketballHoop
    }

    public getBasketballHoop(): BasketballHoop {
        return this.basketballHoop
    }
    
}

export default RingHoopArcadeImage