import StarText from "../entities/scores/StarText";
import AssetManager from "../managers/AssetManager";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import InventoryManager from "../managers/InventoryManager";
import UiImage from "../ultilities/ui/UiImage";
import UiImageButton from "../ultilities/ui/UiImageButton";
import CustomizeUIScene from "./CustomizeUIScene";

class ChallengeStartUIScene extends Phaser.Scene {
    private gameStateManager: DunkShotGameStateManager;

    constructor() {
        super(AssetManager.CHALLENGE_START_UI_SCENE);
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data;
    }

    create() {
        const { width: widthConfig, height : heightConfig } = this.sys.game.config;
        const width = Number(widthConfig) as any;
        const height = Number(heightConfig) as any;
        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 0.8);
        overlay.fillRect(0, 0, width, height);
        





    }

    
}

export default ChallengeStartUIScene;