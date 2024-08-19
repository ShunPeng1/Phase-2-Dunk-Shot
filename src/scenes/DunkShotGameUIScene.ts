import AssetManager from "../managers/AssetManager"
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager"
import UiImageButton from "../utilities/ui/UiImageButton"
import UiUtilities from "../utilities/ui/UiUtilities"


class DunkShotGameUIScene extends Phaser.Scene {
    private gameStateManager: DunkShotGameStateManager

    

    constructor() {
        super(AssetManager.DUNK_SHOT_GAME_UI_SCENE)
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data
    }


    create() {
        const pauseButton = new UiImageButton(this, 30, 30, AssetManager.PAUSE_BUTTON_KEY)
        pauseButton.setScale(0.7)
        pauseButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadPauseUI()
        })

        UiUtilities.applyButtonScaleTweens(pauseButton)

    }
}


export default DunkShotGameUIScene