import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import UiImage from "../ui/UiImage";
import UiImageButton from "../ui/UiImageButton";
import MainMenuInputHandler from "../input-handlers/MainMenuInputHandler";
import ScoreManager from "../managers/ScoreManager";

class RestartUIScene extends Scene {
    constructor() {
        super({ key: AssetManager.RESTART_UI_SCENE });
    }


    create() {      

        let highScoreTextLabel = this.add.text(300, 50, 'High Score', { font: '30px Arial', color: '#ff8b00'  }).setOrigin(0.5); 
        let highScoreText = this.add.text(300, 120, ScoreManager.getInstance().getHighScore().toString(), { font: 'bold 100px Arial', color: '#ff8b00'  }).setOrigin(0.5);

        

        
        let restartButton = new UiImageButton(this, 300, 550, AssetManager.RESTART_BUTTON_KEY);
        restartButton.setScale(0.6);
        restartButton.setOnActiveCallback(() => {
            this.scene.stop(AssetManager.RESTART_UI_SCENE); // Stop the current restart UI scene
            this.scene.stop(AssetManager.GAME_SCENE); // Stop the current game scene
            this.scene.start(AssetManager.GAME_SCENE); // Start the game scene again, effectively restarting it
        });



    }
    
}

export default RestartUIScene;