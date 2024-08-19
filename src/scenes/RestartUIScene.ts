import { Scene } from "phaser"
import AssetManager from "../managers/AssetManager"

import ScoreManager from "../managers/ScoreManager"
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager"
import UiImageButton from "../utilities/ui/UiImageButton"
import UiUtilities from "../utilities/ui/UiUtilities"

class RestartUIScene extends Scene {
    private gameStateManager: DunkShotGameStateManager

    constructor() {
        super({ key: AssetManager.RESTART_UI_SCENE })
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data
    }


    create() {      

        const { width, height } = this.sys.game.config

        
        const overlay = this.add.graphics()
        overlay.fillStyle(0xe8e8e8, 0.4) // Grey color with alpha 0.6
        overlay.fillRect(0, 0, Number(width), Number(height))


        const highScoreTextLabel = this.add.text(300, 50, 'High Score', { font: '30px Arial', color: '#ff8b00' }).setOrigin(0.5) 
        const highScoreText = this.add.text(300, 120, ScoreManager.getInstance().getHighScore().toString(), { font: 'bold 100px Arial', color: '#ff8b00' }).setOrigin(0.5)

        

    
        const restartButton = new UiImageButton(this, 300, 550, AssetManager.RESTART_BUTTON_KEY)
        restartButton.setScale(0.6)
        restartButton.addOnPressUpCallback(() => {
            this.gameStateManager.reloadGame()
        })

        UiUtilities.applyButtonScaleTweens(restartButton)



    }
    
}

export default RestartUIScene