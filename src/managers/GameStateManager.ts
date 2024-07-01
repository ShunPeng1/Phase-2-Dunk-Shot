import { Scene } from "phaser";
import AssetManager from "./AssetManager";

class GameStateManager extends Phaser.Events.EventEmitter {
    private scene : Scene;
    
    
    constructor(scene: Scene) {
        super();
        
        this.scene = scene;
    
    }

    public loadMainMenuUI(): void {
        this.scene.scene.launch(AssetManager.MAIN_MENU_UI_SCENE);
    }

    public loadRestartUI(): void {
        this.scene.scene.launch(AssetManager.RESTART_UI_SCENE);
    }

}


export default GameStateManager;