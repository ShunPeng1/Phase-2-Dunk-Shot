import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import UiImage from "../ui/UiImage";
import UiImageButton from "../ui/UiImageButton";
import MainMenuInputHandler from "../input-handlers/MainMenuInputHandler";

class RestartUIScene extends Scene {
    constructor() {
        super({ key: AssetManager.RESTART_UI_SCENE });
    }


    create() {      
        
        let restartButton = new UiImageButton(this, AssetManager.WORLD_WIDTH/2, 550, AssetManager.RESTART_BUTTON_KEY);
        restartButton.setScale(0.6);
        restartButton.setOnActiveCallback(() => {
            this.scene.stop(AssetManager.RESTART_UI_SCENE); // Stop the current restart UI scene
            this.scene.stop(AssetManager.GAME_SCENE); // Stop the current game scene
            this.scene.start(AssetManager.GAME_SCENE); // Start the game scene again, effectively restarting it
        });



    }
    
}

export default RestartUIScene;