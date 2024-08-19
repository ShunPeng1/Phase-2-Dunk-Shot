import AssetManager from "../managers/AssetManager"
import ChallengeGameStateManager from "../managers/ChallengeGameStateManager"
import UiImageButton from "../utilities/ui/UiImageButton"
import UiUtilities from "../utilities/ui/UiUtilities"

class ChallengeLoseUIScene extends Phaser.Scene {
    private gameStateManager: ChallengeGameStateManager

    constructor() {
        super(AssetManager.CHALLENGE_LOSE_UI_SCENE)
    }

    init(data: ChallengeGameStateManager) {
        this.gameStateManager = data
    }

    create() {
        const { width: widthConfig, height: heightConfig } = this.sys.game.config
        const width = Number(widthConfig) as any
        const height = Number(heightConfig) as any
        
        const overlay = this.add.graphics()
        overlay.fillStyle(0xe8e8e8, 0.8)
        overlay.fillRect(0, 0, width, height)

        const behindPanel = this.add.image(width/2, height/2, AssetManager.MASKS_23_KEY)
        behindPanel.setScale(0.9, 0.65)

        const panelText = this.add.text(width/2, height/2 - 150, 'CHALLENGE FAILED', { font: '32px Arial', color: '#b8b8b8' }).setOrigin(0.5)

        
        const rewardIcon = this.add.image(width/2, height/2 - 40, AssetManager.WHEEL_181_KEY)

        rewardIcon.setScale(0.8)
        

        const restartButton = new UiImageButton(this, width/2 + 90, height/2 + 100, AssetManager.UI_90_KEY)

        const restartText = this.add.text(restartButton.x, restartButton.y, 'TRY AGAIN', { font: '34px Arial', color: '#ffffff' }).setOrigin(0.5)
        restartButton.add(restartText)

        restartButton.setScale(0.8)

        restartButton.addOnPressUpCallback(() => {
            this.gameStateManager.reloadChallenge()
        })

        UiUtilities.applyButtonScaleTweens(restartButton)

        const giveUpButton = new UiImageButton(this, width/2 - 90, height/2 + 100, AssetManager.MASKS_118_KEY)

        const giveUpText = this.add.text(giveUpButton.x, giveUpButton.y, 'GIVE UP', { font: '34px Arial', color: '#ffffff' }).setOrigin(0.5)
        giveUpButton.add(giveUpText)

        giveUpButton.setScale(0.8)

        giveUpButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadChallengeMenu()
        })

        UiUtilities.applyButtonScaleTweens(giveUpButton)


        const exitButton = new UiImageButton(this, width/2 + 180, height/2 - 230, AssetManager.MASKS_98_KEY)
        exitButton.setOrigin(0, 0)
        exitButton.setDepth(10)
        
        UiUtilities.applyButtonScaleTweens(exitButton)

        exitButton.addOnPressDownCallback(() => {
            
            this.gameStateManager.loadChallengeMenu()
        })



    }

    
}

export default ChallengeLoseUIScene