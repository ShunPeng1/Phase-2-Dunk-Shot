import AssetManager from "../managers/AssetManager";
import GameStateManager from "../managers/GameStateManager";
import UiImageButton from "../ui/UiImageButton";

class DunkShotGameUIScene extends Phaser.Scene {
    private gameStateManager: GameStateManager;

    

    constructor() {
        super(AssetManager.DUNK_SHOT_GAME_UI_SCENE);
    }

    init(data: GameStateManager) {
        this.gameStateManager = data;
    }


    create() {
        let pauseButton = new UiImageButton(this, 50, 50, AssetManager.PAUSE_BUTTON_KEY);
        pauseButton.setScale(1);
        pauseButton.setOnActiveCallback(() => {
            this.gameStateManager.loadPauseUI();
        });

    }
}


export default DunkShotGameUIScene;