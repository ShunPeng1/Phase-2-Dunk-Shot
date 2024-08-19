class ScoreText extends Phaser.GameObjects.Text {
    

    constructor(scene : Phaser.Scene, x : number, y : number, text : string, style : Phaser.Types.GameObjects.Text.TextStyle) {
        super(scene, x, y, text, style)
        scene.add.existing(this)
        this.setOrigin(0.5)
    }

    public updateScore(score : number) : void {
        this.setText(score.toString())
    }

    
    

}

export default ScoreText