import AssetManager from "../managers/AssetManager"
import ChallengeGameStateManager from "../managers/ChallengeGameStateManager"
import UiImageButton from "../utilities/ui/UiImageButton"
import UiUtilities from "../utilities/ui/UiUtilities"

class ChallengeStartUIScene extends Phaser.Scene {
    private gameStateManager: ChallengeGameStateManager

    constructor() {
        super(AssetManager.CHALLENGE_START_UI_SCENE)
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

        const challengeText = this.add.text(width/2, height/2 - 150, 'CHALLENGES', { font: '28px Arial', color: '#939393' }).setOrigin(0.5)

        const banner = this.add.image(width/2, height/2 - 50, AssetManager.UI_218_KEY)
        banner.setScale(0.705)

        const rewardText = this.add.text(width/2 + 170, height/2 - 90, 'Rewards', { font: '20px Arial', color: '#ffffff' }).setOrigin(0.5)
        

        const rewardIcon = this.add.image(width/2 + 170, height/2 - 40, AssetManager.WHEEL_181_KEY)

        rewardIcon.setScale(0.4)
        
        const scoreToWin = this.gameStateManager.getChallengeConfiguration().scoreToWin

        const goalText = this.add.text(width/2 - 75, height/2 - 50, 'Need to reach '+ scoreToWin +' points', { font: '26px Arial', color: '#ffffff' }).setOrigin(0.5)

        const startButton = new UiImageButton(this, width/2, height/2 + 100, AssetManager.UI_139_KEY)

        const startText = this.add.text(startButton.x, startButton.y, 'Start', { font: '40px Arial', color: '#ffffff' }).setOrigin(0.5)
        startButton.add(startText)

        startButton.setScale(0.8)

        startButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadGameUI()
        })

        UiUtilities.applyButtonScaleTweens(startButton)



        const exitButton = new UiImageButton(this, width/2 + 180, height/2 - 230, AssetManager.MASKS_98_KEY)
        exitButton.setOrigin(0, 0)
        exitButton.setDepth(10)
        
        UiUtilities.applyButtonScaleTweens(exitButton)

        exitButton.addOnPressDownCallback(() => {
            this.gameStateManager.loadChallengeMenu()
        })



    }

    
}

export default ChallengeStartUIScene