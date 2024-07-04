import StarText from "../entities/scores/StarText";
import AssetManager from "../managers/AssetManager";
import ChallengeGameStateManager from "../managers/ChallengeGameStateManager";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import InventoryManager from "../managers/InventoryManager";
import UiImage from "../ultilities/ui/UiImage";
import UiImageButton from "../ultilities/ui/UiImageButton";
import UiUtilities from "../ultilities/ui/UiUtilities";
import CustomizeUIScene from "./CustomizeUIScene";

class ChallengeWinUIScene extends Phaser.Scene {
    private gameStateManager: ChallengeGameStateManager;

    constructor() {
        super(AssetManager.CHALLENGE_WIN_UI_SCENE);
    }

    init(data: ChallengeGameStateManager) {
        this.gameStateManager = data;
    }

    create() {
        const { width: widthConfig, height : heightConfig } = this.sys.game.config;
        const width = Number(widthConfig) as any;
        const height = Number(heightConfig) as any;
        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 0.8);
        overlay.fillRect(0, 0, width, height);

        let behindPanel = this.add.image(width/2, height/2, AssetManager.MASKS_23_KEY);
        behindPanel.setScale(0.9, 0.65);

        let panelText = this.add.text(width/2, height/2 - 150, 'CHALLENGE COMPLETED', { font: '28px Arial', color: '#b8b8b8' }).setOrigin(0.5);

        let rewardIcon = this.add.image(width/2, height/2 - 40 , AssetManager.WHEEL_181_KEY);

        rewardIcon.setScale(0.8);
        

        let returnButton = new UiImageButton(this, width/2, height/2 + 100, AssetManager.MASKS_118_KEY);

        let returnText = this.add.text(returnButton.x, returnButton.y, 'RETURN', { font: '34px Arial', color: '#ffffff' }).setOrigin(0.5);
        returnButton.add(returnText);

        returnButton.setScale(0.8);

        returnButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadChallengeMenu();
        });

        UiUtilities.applyButtonScaleTweens(returnButton);


        let exitButton = new UiImageButton(this, width/2 + 180, height/2 - 230, AssetManager.MASKS_98_KEY);
        exitButton.setOrigin(0, 0);
        exitButton.setDepth(10);
        
        UiUtilities.applyButtonScaleTweens(exitButton);

        exitButton.addOnPressDownCallback(() => {
            
            this.gameStateManager.loadChallengeMenu();
        });



    }

    
}

export default ChallengeWinUIScene;