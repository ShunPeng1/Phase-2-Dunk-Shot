import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager"

class LoadingScene extends Scene {
    private loadingProgressComplete: boolean;

    constructor() {
        super(AssetManager.LOADING_SCENE);
    }

    public preload() : void {

        // Basket
        this.load.image(AssetManager.GOLDEN_STAR_KEY, AssetManager.GOLDEN_STAR_IMAGE);

        // Masks
        this.load.image(AssetManager.INNER_RING_BASKET_KEY, AssetManager.INNER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.OUTER_RING_BASKET_KEY, AssetManager.OUTER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.NET_BASKET_KEY, AssetManager.NET_BASKET_IMAGE);

        this.load.image(AssetManager.BASKETBALL_KEY, AssetManager.BASKETBALL_IMAGE);
        this.load.image(AssetManager.TRAJECTORY_KEY, AssetManager.TRAJECTORY_IMAGE);


        // Main menu title image
        this.load.image(AssetManager.MAIN_MENU_TITLE_KEY, AssetManager.MAIN_MENU_TITLE_IMAGE);
        this.load.image(AssetManager.MOBILE_TITLE_KEY, AssetManager.MOBILE_TITLE_IMAGE);

        // UI Buttons
        this.load.image(AssetManager.CHALENGES_BUTTON_KEY, AssetManager.CHALENGES_BUTTON_IMAGE);
        this.load.image(AssetManager.CUSTOMIZE_BUTTON_KEY, AssetManager.CUSTOMIZE_BUTTON_IMAGE);
        
        this.load.image(AssetManager.RESTART_BUTTON_KEY, AssetManager.RESTART_BUTTON_IMAGE);

        this.load.image(AssetManager.PAUSE_BUTTON_KEY, AssetManager.PAUSE_BUTTON_IMAGE);
        
        
        this.load.image(AssetManager.RESUME_WIDE_BUTTON_KEY, AssetManager.RESUME_WIDE_BUTTON_IMAGE);
        this.load.image(AssetManager.HOMEPAGE_WIDE_BUTTON_KEY, AssetManager.HOMEPAGE_WIDE_BUTTON_IMAGE);
        this.load.image(AssetManager.SKIN_WIDE_BUTTON_KEY, AssetManager.SKIN_WIDE_BUTTON_IMAGE);

    
    }
    
    // The rest of this file makes the visual loading bar work!
    public create() : void {
        // Loading bar code
        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;

        this.add.text(centerX, centerY - 48, "Dunk Shot", { fontFamily: 'Arial', fontSize: '32px', color: '#ffffff' })
        .setOrigin(0.5, 0.5);
    }

    public init() : void {
        // Loading bar code
        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;
        let barWidth = this.cameras.main.width - 24;
        let barHeight = 25;

        var progressBox = this.add.rectangle(
        centerX,
        centerY,
        barWidth,
        barHeight,
        0x000000
        );

        var progressBar = this.add
        .rectangle(
            progressBox.x - progressBox.width / 2,
            centerY,
            barWidth,
            barHeight,
            0xffffff
        )
        .setOrigin(0, 0.5)
        .setScale(0, 1);

        this.load.on("progress", (value: number | undefined) => {
            console.log(value);
            progressBar.setScale(value, 1);
        });

        this.load.on("complete", () => {
            this.nextScene();
            this.loadingProgressComplete = true;
        });
    }

    private nextScene() : void {
        this.scene.start(AssetManager.GAME_SCENE);
    }
}

export default LoadingScene;