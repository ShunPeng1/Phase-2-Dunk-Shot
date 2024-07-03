import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import GameStateManager from "../managers/GameStateManager";
import UiImageButton from "../ultilities/ui/UiImageButton";

class PauseUIScene extends Scene{
    private gameStateManager: GameStateManager;

    

    constructor() {
        super(AssetManager.PAUSE_UI_SCENE);
    }

    init(data: GameStateManager) {
        this.gameStateManager = data;
    }


    create() {
        
        const { width, height } = this.sys.game.config;

        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 0.8); // Grey color with alpha 0.6
        overlay.fillRect(0, 0, Number(width), Number(height));
    


        const homepageButton = new UiImageButton(this, Number(width) / 2, Number(height) / 2 - 200, AssetManager.HOMEPAGE_WIDE_BUTTON_KEY);
        homepageButton.setScale(0.8);
        homepageButton.setOnActiveCallback(() => {
            this.gameStateManager.loadGame();
        });

        const homepageText = this.add.text(Number(width) / 2 + 30, Number(height) / 2 - 200, 'HOMEPAGE', { font: 'bold 30px Arial', color: '#ffffff'  }).setOrigin(0.5);


        const skinButton = new UiImageButton(this, Number(width) / 2, Number(height) / 2 - 50, AssetManager.SKIN_WIDE_BUTTON_KEY);
        skinButton.setScale(0.8);
        skinButton.setOnActiveCallback(() => {
            this.gameStateManager.loadCustomizeUI();
        });

        const skinText = this.add.text(Number(width) / 2 + 30, Number(height) / 2 - 50, 'SKIN', { font: 'bold 30px Arial', color: '#ffffff'  }).setOrigin(0.5);

        
        const resumeButton = new UiImageButton(this, Number(width) / 2, Number(height) / 2 + 100 , AssetManager.RESUME_WIDE_BUTTON_KEY);
        resumeButton.setScale(0.8);
        resumeButton.setOnActiveCallback(() => {
            this.gameStateManager.loadGameUI();
        });

        const resumeText = this.add.text(Number(width) / 2 + 30, Number(height) / 2 + 100, 'RESSUME', { font: 'bold 30px Arial', color: '#ffffff'  }).setOrigin(0.5);



    }


}

export default PauseUIScene;