import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";

class MainMenuInputHandler {
    private scene : Scene;
    private gameScene : Scene;
    private onPointerDownInMainMenuScene: () => void; // Define the event handler as a class member

    constructor(scene: Scene) {
        
        this.scene = scene;
        this.gameScene = this.scene.scene.get(AssetManager.GAME_SCENE);

        this.onPointerDownInMainMenuScene = () => this.stopMainMenuUI(); // Initialize the event handler
    
        this.gameScene.input.on('pointerdown', this.onPointerDownInMainMenuScene); // Use the event handler reference
    
    }

    
    private stopMainMenuUI(): void {
        this.scene.scene.stop(AssetManager.MAIN_MENU_UI_SCENE);
        this.gameScene.input.off('pointerdown', this.onPointerDownInMainMenuScene); // Unsubscribe the event handler
    }
}

export default MainMenuInputHandler;