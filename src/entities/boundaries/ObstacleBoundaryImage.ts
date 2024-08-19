import BoundaryImage from "./BoundaryImage"

class ObstacleBoundaryImage extends BoundaryImage {
    private arcadeBody: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, width: number, height: number, isCircle = false) {
        super(scene, x, y, texture, width, height, isCircle)

        this.width = width
        this.height = height
        this.arcadeBody = this.body as Phaser.Physics.Arcade.Body
    }

    
    public setRotation(radians?: number): this {
        super.setRotation(radians)

        if (!radians){
            return this
        }

        if (this.isCircle){
            this.arcadeBody.setCircle(this.width / 2)
            return this
        }

        if (radians === 0 || radians === Math.PI){
            this.arcadeBody.setSize(this.vericalWidth, this.verticalHeight)
        }
        else if (radians === Math.PI / 2 || radians === 3 * Math.PI / 2){
            this.arcadeBody.setSize(this.verticalHeight, this.vericalWidth)
        }

        return this
    }

}

export default ObstacleBoundaryImage