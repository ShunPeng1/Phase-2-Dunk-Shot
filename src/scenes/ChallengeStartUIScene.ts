import StarText from "../entities/scores/StarText";
import AssetManager from "../managers/AssetManager";
import ChallengeGameStateManager from "../managers/ChallengeGameStateManager";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import InventoryManager from "../managers/InventoryManager";
import UiImage from "../ultilities/ui/UiImage";
import UiImageButton from "../ultilities/ui/UiImageButton";
import UiUtilities from "../ultilities/ui/UiUtilities";
import CustomizeUIScene from "./CustomizeUIScene";

class ChallengeStartUIScene extends Phaser.Scene {
    private gameStateManager: ChallengeGameStateManager;

    constructor() {
        super(AssetManager.CHALLENGE_START_UI_SCENE);
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

        let challengeText = this.add.text(width/2, height/2 - 150, 'CHALLENGES', { font: '28px Arial', color: '#939393' }).setOrigin(0.5);

        let banner = this.add.image(width/2, height/2 - 50, AssetManager.UI_218_KEY);
        banner.setScale(0.705);

        let rewardText = this.add.text(width/2 + 170, height/2 - 90, 'Rewards', { font: '20px Arial', color: '#ffffff' }).setOrigin(0.5);
        

        let rewardIcon = this.add.image(width/2 + 170, height/2 - 40 , AssetManager.WHEEL_181_KEY);

        rewardIcon.setScale(0.4);
        
        let scoreToWin = this.gameStateManager.getChallengeConfiguration().scoreToWin;

        let goalText = this.add.text(width/2 - 75, height/2 - 50, 'Need to reach '+ scoreToWin +' points', { font: '26px Arial', color: '#ffffff' }).setOrigin(0.5);

        let startButton = new UiImageButton(this, width/2, height/2 + 100, AssetManager.UI_139_KEY);

        let startText = this.add.text(startButton.x, startButton.y, 'Start', { font: '40px Arial', color: '#ffffff' }).setOrigin(0.5);
        startButton.add(startText);

        startButton.setScale(0.8);

        startButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadGameUI();
        });

        UiUtilities.applyButtonScaleTweens(startButton);



        let exitButton = new UiImageButton(this, width/2 + 180, height/2 - 230, AssetManager.MASKS_98_KEY);
        exitButton.setOrigin(0, 0);
        exitButton.setDepth(10);
        
        UiUtilities.applyButtonScaleTweens(exitButton);

        exitButton.addOnPressDownCallback(() => {
            this.gameStateManager.loadChallengeMenu();
        });



    }

    
}

export default ChallengeStartUIScene;