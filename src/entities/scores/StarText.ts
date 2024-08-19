import AssetManager from "../../managers/AssetManager"

class StarText extends Phaser.GameObjects.Text {
    private starImage : Phaser.GameObjects.Image


    constructor(scene : Phaser.Scene, x : number, y : number, text : string, style : Phaser.Types.GameObjects.Text.TextStyle) {
        super(scene, x, y, text, style)
        scene.add.existing(this)
        this.setOrigin(0.5)


        this.starImage = scene.add.image(this.x - 40, this.y, AssetManager.GOLDEN_STAR_KEY)
        

        this.starImage.setDepth(100)
        this.setDepth(100)

    }

    public updateStar(score : number) : void {
        if (score !== undefined) {
            this.setText(score.toString())
        } else {
            // Handle the undefined case, e.g., set text to "0" or log an error
            this.setText("0") // Default value if score is undefined
        }
    }

    public setScale(x?: number | undefined, y?: number | undefined): this {
        this.starImage.setScale(x, y)
        super.setScale(x, y)

        return this
    }

    public setScrollFactor(x: number, y: number): this {
        this.starImage.setScrollFactor(x, y)
        super.setScrollFactor(x, y)

        return this
    }

    
}

export default StarText