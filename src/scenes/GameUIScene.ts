import AssetManager from "../managers/AssetManager";
import GameStateManager from "../managers/GameStateManager";
import UiImageButton from "../ui/UiImageButton";

class GameUIScene extends Phaser.Scene {
    private gameStateManager: GameStateManager;

    

    constructor() {
        super(AssetManager.GAME_UI_SCENE);
    }

    init(data: GameStateManager) {
        this.gameStateManager = data;
    }


    create() {
        let pauseButton = new UiImageButton(this, 50, 50, AssetManager.PAUSE_BUTTON_KEY);
        pauseButton.setScale(0.5);
        pauseButton.setOnActiveCallback(() => {
            console.log("Pause button is active");
        });

    }
}

