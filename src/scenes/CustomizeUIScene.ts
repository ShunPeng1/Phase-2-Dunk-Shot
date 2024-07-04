import StarText from "../entities/scores/StarText";
import AssetManager from "../managers/AssetManager";
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager";
import InventoryManager from "../managers/InventoryManager";
import UiImage from "../ultilities/ui/UiImage";
import UiImageButton from "../ultilities/ui/UiImageButton";


class CustomizeUIScene extends Phaser.Scene {
    private gameStateManager: DunkShotGameStateManager;

    constructor() {
        super(AssetManager.CUSTOMIZE_UI_SCENE);
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data;
    }

    create() {
        const { width: widthConfig, height : heightConfig } = this.sys.game.config;
        const width = Number(widthConfig) as any;
        const height = Number(heightConfig) as any;
        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 1);
        overlay.fillRect(0, 0, width, height);
        

        let topBar = new UiImage(this, 0, -30, AssetManager.MASKS_TOP_WAVY_KEY);
        topBar.setOrigin(0, 0);
        

        let backButton = new UiImageButton(this, 40, 15, AssetManager.MASKS_LEFT_TRIANGLE_KEY);
        backButton.setOrigin(0, 0);
        backButton.setScale(0.6);
        backButton.addOnPressDownCallback(() => {
            console.log("Back button is active");
            this.gameStateManager.loadPreviousUI();
        });

        this.setupStarManagement();


        let adButton = new UiImageButton(this, width/2, 150, AssetManager.UI_AD_WIDE_KEY);

        adButton.setScale(0.6);

        adButton.addOnPressDownCallback(() => {
            console.log("Ad button is active");
        });

        let middleBar = new UiImage(this, width/2, 240, AssetManager.MASKS_222_KEY);
        middleBar.setScale(5, 1)

        let ballImagePrefab = new UiImage(this, width/2, 400, AssetManager.BASKETBALL_KEY);
        ballImagePrefab.setScale(0.5);
        //this.children.remove(ballImagePrefab);




    }

    
    private setupStarManagement() : void {
        let starText = new StarText(this, 530, 90, '0', { 
            fontSize: 'bold 40px', 
            fontFamily: 'Arial', // Specify a bold font family
            color: '#f2a63b', // Example color: white
            align: 'center' // Ensure the text is centered
            }
        );

        starText.setScale(0.75);
        starText.setOrigin(0.5, 0.5); // Center the origin of the text for accurate positioning
        starText.setScrollFactor(0, 0); // This line makes the score text follow the camera
   
        starText.updateStar(InventoryManager.getInstance().getItem(AssetManager.GOLDEN_STAR_INVENTORY_KEY));
        
    }
}

export default CustomizeUIScene;