import { Scene } from "phaser";
import AssetManager from "../AssetManager"

class LoadingScene extends Scene {
    private loadingProgressComplete: boolean;

    constructor() {
        super(AssetManager.LOADING_SCENE);
    }

    public preload() : void {
        this.load.image(AssetManager.INNER_RING_BASKET_KEY, AssetManager.INNER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.OUTER_RING_BASKET_KEY, AssetManager.OUTER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.NET_BASKET_KEY, AssetManager.NET_BASKET_IMAGE);
        
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
        this.scene.start(AssetManager.PLAY_SCENE);
    }
}

export default LoadingScene;