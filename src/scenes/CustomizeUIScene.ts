import AssetManager from "../managers/AssetManager";
import GameStateManager from "../managers/GameStateManager";
import UiImage from "../ui/UiImage";
import UiImageButton from "../ui/UiImageButton";

class CustomizeUIScene extends Phaser.Scene {
    private gameStateManager: GameStateManager;

    constructor() {
        super(AssetManager.CUSTOMIZE_UI_SCENE);
    }

    init(data: GameStateManager) {
        this.gameStateManager = data;
    }

    create() {
        const { width, height } = this.sys.game.config;

        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 1);
        overlay.fillRect(0, 0, Number(width), Number(height));
        

        let topBar = new UiImage(this, 0, 0, AssetManager.MASKS_TOP_WAVY_KEY);
        topBar.setOrigin(0, 0);

        let backButton = new UiImageButton(this, 20, 20, AssetManager.MASKS_LEFT_TRIANGLE_KEY);
        backButton.setOrigin(0, 0);
        backButton.setOnActiveCallback(() => {
            console.log("Back button is active");
            this.gameStateManager.loadPreviousUI();
        });

    }
}

export default CustomizeUIScene;