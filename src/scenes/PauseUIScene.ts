import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import UiImageButton from "../ultilities/ui/UiImageButton";
import UiUtilities from "../ultilities/ui/UiUtilities";

class PauseUIScene extends Scene{
    private gameStateManager: DunkShotGameStateManager;

    

    constructor() {
        super(AssetManager.PAUSE_UI_SCENE);
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data;
    }


    create() {
        
        const { width, height } = this.sys.game.config;

        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 0.8); // Grey color with alpha 0.6
        overlay.fillRect(0, 0, Number(width), Number(height));
    


        const homepageButton = new UiImageButton(this, Number(width) / 2, Number(height) / 2 - 200, AssetManager.HOMEPAGE_WIDE_BUTTON_KEY);
        homepageButton.addOnPressUpCallback(() => {
            this.gameStateManager.reloadGame();
        });

        const homepageText = this.add.text(homepageButton.x + 30, homepageButton.y, 'HOMEPAGE', { font: 'bold 30px Arial', color: '#ffffff'  }).setOrigin(0.5);
        homepageButton.add(homepageText);
        homepageButton.setScale(0.8);
        UiUtilities.applyButtonScaleTweens(homepageButton);
        

        const skinButton = new UiImageButton(this, Number(width) / 2, Number(height) / 2 - 50, AssetManager.SKIN_WIDE_BUTTON_KEY);
        skinButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadCustomizeUI();
        });

        const skinText = this.add.text(skinButton.x + 30, skinButton.y, 'SKIN', { font: 'bold 30px Arial', color: '#ffffff' }).setOrigin(0.5);
        skinButton.add(skinText);
        skinButton.setScale(0.8);
        UiUtilities.applyButtonScaleTweens(skinButton);

        const resumeButton = new UiImageButton(this, Number(width) / 2, Number(height) / 2 + 100, AssetManager.RESUME_WIDE_BUTTON_KEY);
        resumeButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadGameUI();
        });

        const resumeText = this.add.text(resumeButton.x + 30, resumeButton.y, 'RESUME', { font: 'bold 30px Arial', color: '#ffffff' }).setOrigin(0.5);
        resumeButton.add(resumeText);
        resumeButton.setScale(0.8);
        UiUtilities.applyButtonScaleTweens(resumeButton);


    }


}

export default PauseUIScene;