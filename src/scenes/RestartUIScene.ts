import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";

import ScoreManager from "../managers/ScoreManager";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import UiImageButton from "../ultilities/ui/UiImageButton";
import UiUtilities from "../ultilities/ui/UiUtilities";

class RestartUIScene extends Scene {
    private gameStateManager: DunkShotGameStateManager;

    constructor() {
        super({ key: AssetManager.RESTART_UI_SCENE });
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data;
    }


    create() {      

        const { width, height } = this.sys.game.config;

        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 0.4); // Grey color with alpha 0.6
        overlay.fillRect(0, 0, Number(width), Number(height));


        let highScoreTextLabel = this.add.text(300, 50, 'High Score', { font: '30px Arial', color: '#ff8b00'  }).setOrigin(0.5); 
        let highScoreText = this.add.text(300, 120, ScoreManager.getInstance().getHighScore().toString(), { font: 'bold 100px Arial', color: '#ff8b00'  }).setOrigin(0.5);

        

    
        let restartButton = new UiImageButton(this, 300, 550, AssetManager.RESTART_BUTTON_KEY);
        restartButton.setScale(0.6);
        restartButton.addOnPressUpCallback(() => {
            this.gameStateManager.loadGame();
        });

        UiUtilities.applyButtonScaleTweens(restartButton);



    }
    
}

export default RestartUIScene;