import { Scene } from "phaser";
import AssetManager from "./AssetManager";

class GameStateManager extends Phaser.Events.EventEmitter {
    private scene : Scene;
    
    
    constructor(scene: Scene) {
        super();
        
        this.scene = scene;
    
    }

    public loadMainMenuUI(): void {
        this.scene.scene.launch(AssetManager.MAIN_MENU_UI_SCENE, this);
    }

    public unloadMainMenuUI(): void {
        this.scene.scene.stop(AssetManager.MAIN_MENU_UI_SCENE);
    }

    public loadRestartUI(): void {
        this.scene.scene.launch(AssetManager.RESTART_UI_SCENE, this);
    }

    public unloadRestartUI(): void {
        this.scene.scene.stop(AssetManager.RESTART_UI_SCENE);
    }

    public loadGameUI(): void {
        this.scene.scene.launch(AssetManager.GAME_UI_SCENE);
    }

    public unloadGameUI(): void {
        this.scene.scene.stop(AssetManager.GAME_UI_SCENE);
    }

    public loadPauseUI(): void {
        this.scene.scene.launch(AssetManager.PAUSE_UI_SCENE);
    }

    public unloadPauseUI(): void {
        this.scene.scene.stop(AssetManager.PAUSE_UI_SCENE);
    }
    

}


export default GameStateManager;