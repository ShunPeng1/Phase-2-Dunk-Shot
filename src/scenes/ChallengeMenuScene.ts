import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";
import UiImage from "../ultilities/ui/UiImage";
import UiImageButton from "../ultilities/ui/UiImageButton";
import ChallengeSelectionButton from "../entities/ui/ChallengeSelectionButton";

class ChallengeMenuScene extends Scene{
    constructor() {
        super(AssetManager.CHALLENGE_MENU_SCENE);
    }

    create() {
        const { width: widthConfig, height : heightConfig } = this.sys.game.config;
        const width = Number(widthConfig) as any;
        const height = Number(heightConfig) as any;
        
        const overlay = this.add.graphics();
        overlay.fillStyle(0xe8e8e8, 1);
        overlay.fillRect(0, 0, width, height);


        let topBanner = new UiImage(this, 0, 0, AssetManager.MASKS_210_KEY);
        topBanner.setScale(5, 1);
        topBanner.setOrigin(0, 0);
        topBanner.setTint(0xed702e);

        let challengeText = this.add.text(width/2, 35, 'CHALLENGES', { font: 'bold 40px Arial', color: '#ffffff'  }).setOrigin(0.5);

        

        let backButton = new UiImageButton(this, 30, 20, AssetManager.MASKS_LEFT_TRIANGLE_KEY);
        backButton.setScale(0.6);
        backButton.setOrigin(0, 0);

        backButton.addOnPressDownCallback(() => {
            this.scene.start(AssetManager.DUNK_SHOT_GAME_SCENE);
        });

        
        let newBallChallengeButton = new ChallengeSelectionButton(this, width/2, 150, AssetManager.UI_387_KEY, "NEW BALL", AssetManager.MASKS_135_KEY);
        newBallChallengeButton.setScale(0.7);
        newBallChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active");
        });


        
        let middleBar = new UiImage(this, width/2, 240, AssetManager.MASKS_222_KEY);
        middleBar.setScale(5, 1)


        let limitTimeChallengeButton = new ChallengeSelectionButton(this, width/2, 330, AssetManager.UI_131_KEY, "LIMIT TIME", AssetManager.MASKS_152_KEY);
        limitTimeChallengeButton.setScale(0.6);
        limitTimeChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active");
        });


        let achievementChallengeButton = new ChallengeSelectionButton(this, width/2,  330 + 130, AssetManager.UI_151_KEY, "ACHIEVEMENT", AssetManager.MASKS_111_KEY);
        achievementChallengeButton.setScale(0.6);
        achievementChallengeButton.addOnPressDownCallback(() => {
            this.scene.start(AssetManager.CHALLENGE_GAME_SCENE);
        });


        let bounceChallengeButton = new ChallengeSelectionButton(this, width/2,  330 + 130 * 2, AssetManager.UI_88_KEY, "BOUNCE", AssetManager.MASKS_143_KEY);
        bounceChallengeButton.setScale(0.6);
        bounceChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active");
        });

        
        let accurateChallengeButton = new ChallengeSelectionButton(this, width/2,  330 + 130 * 3, AssetManager.UI_4_KEY, "ACCURATE", AssetManager.MASKS_27_KEY);
        accurateChallengeButton.setScale(0.6);
        accurateChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active");
        });

    }


}

export default ChallengeMenuScene;