import { Scene } from "phaser";
import UiImageButton from "../ui/UiImageButton";
import AssetManager from "../managers/AssetManager";
import GameStateManager from "../managers/GameStateManager";

class PauseUIScene extends Scene{
    private gameStateManager: GameStateManager;

    

    constructor() {
        super(AssetManager.PAUSE_UI_SCENE);
    }

    init(data: GameStateManager) {
        this.gameStateManager = data;
    }


    create() {
        console.log("PauseUIScene created");
    }


}

export default PauseUIScene;