import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import UiImage from "../ultilities/ui/UiImage";
import MainMenuInputHandler from "../input-handlers/MainMenuInputHandler";
import GameStateManager from "../managers/GameStateManager";
import UiImageButton from "../ultilities/ui/UiImageButton";

class MainMenuUIScene extends Scene {
    private gameStateManager : GameStateManager;

    constructor() {
        super({ key: AssetManager.MAIN_MENU_UI_SCENE });
        
    }

    init(data: GameStateManager) {
        this.gameStateManager = data;
    }


    create() {
        
        let inputHandler = new MainMenuInputHandler(this, this.gameStateManager);

        let title = new UiImage(this, 260 , 230, AssetManager.MAIN_MENU_TITLE_KEY);
        title.setScale(0.5);

        let mobileTile = new UiImage(this,500, 300, AssetManager.MOBILE_TITLE_KEY);
        mobileTile.setScale(0.5);
    
        // Create a button background
        
        let challengeButton = new UiImageButton(this, 350, 650, AssetManager.CHALENGES_BUTTON_KEY);
        
        challengeButton.setScale(0.7);
        challengeButton.setOnActiveCallback(() => {
            console.log("Challenge button is active");
        });
        let challengeButtonText = this.add.text(challengeButton.x - 7, challengeButton.y + 28, 'CHALLENGES', { font: 'bold 12px Arial' }).setOrigin(0.5);

        
        let customizeButton = new UiImageButton(this, 500, 650, AssetManager.CUSTOMIZE_BUTTON_KEY);
        customizeButton.setScale(0.7);
        customizeButton.setOnActiveCallback(() => {
            console.log("Customize button is active");
            this.gameStateManager.loadCustomizeUI();
        });

        let customizeButtonText = this.add.text(customizeButton.x - 7, customizeButton.y + 28, ' CUSTOMIZE', { font: 'bold 12px Arial' }).setOrigin(0.5);
    }
    
}

export default MainMenuUIScene;