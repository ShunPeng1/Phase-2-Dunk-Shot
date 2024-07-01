import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import GameStateManager from "../managers/GameStateManager";

class MainMenuInputHandler {
    private scene : Scene;
    private gameScene : Scene;
    private gameStateManager: GameStateManager; 
    
    private onPointerDownInMainMenuScene: () => void; // Define the event handler as a class member
    

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        
        this.scene = scene;
        this.gameScene = this.scene.scene.get(AssetManager.GAME_SCENE);
        this.gameStateManager = gameStateManager;

        this.onPointerDownInMainMenuScene = () => this.stopMainMenuUI(); // Initialize the event handler
    
        this.gameScene.input.on('pointerdown', this.onPointerDownInMainMenuScene); // Use the event handler reference
    
    }

    
    private stopMainMenuUI(): void {
        this.gameScene.input.off('pointerdown', this.onPointerDownInMainMenuScene); // Unsubscribe the event handler
        this.gameStateManager.loadGameUI();
    }
}

export default MainMenuInputHandler;