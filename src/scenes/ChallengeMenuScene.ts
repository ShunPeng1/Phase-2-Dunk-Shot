import { Scene } from "phaser"
import AssetManager from "../managers/AssetManager"
import UiImage from "../utilities/ui/UiImage"
import UiImageButton from "../utilities/ui/UiImageButton"
import ChallengeSelectionButton from "../entities/ui/ChallengeSelectionButton"
import LevelCongiguration from "../managers/win-predicates/LevelConfiguration"
import InventoryManager from "../managers/InventoryManager"

class ChallengeMenuScene extends Scene{

    private readonly challengeLevels = [AssetManager.LEVELS_ACHIEVEMENT_1_KEY, AssetManager.LEVELS_ACHIEVEMENT_2_KEY, AssetManager.LEVELS_ACHIEVEMENT_3_KEY]

    

    constructor() {
        super(AssetManager.CHALLENGE_MENU_SCENE)
    }

    create() {
        
        const { width: widthConfig, height: heightConfig } = this.sys.game.config
        const width = Number(widthConfig) as any
        const height = Number(heightConfig) as any
        
        const overlay = this.add.graphics()
        overlay.fillStyle(0xe8e8e8, 1)
        overlay.fillRect(0, 0, width, height)


        const topBanner = new UiImage(this, 0, 0, AssetManager.MASKS_210_KEY)
        topBanner.setScale(5, 1)
        topBanner.setOrigin(0, 0)
        topBanner.setTint(0xed702e)

        const challengeText = this.add.text(width/2, 35, 'CHALLENGES', { font: 'bold 40px Arial', color: '#ffffff' }).setOrigin(0.5)

        

        const backButton = new UiImageButton(this, 30, 20, AssetManager.MASKS_LEFT_TRIANGLE_KEY)
        backButton.setScale(0.6)
        backButton.setOrigin(0, 0)

        backButton.addOnPressDownCallback(() => {
            this.scene.start(AssetManager.DUNK_SHOT_GAME_SCENE)
        })

        
        const newBallChallengeButton = new ChallengeSelectionButton(this, width/2, 150, AssetManager.UI_387_KEY, "NEW BALL", AssetManager.MASKS_135_KEY)
        newBallChallengeButton.setScale(0.7)
        newBallChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active")
        })


        
        const middleBar = new UiImage(this, width/2, 240, AssetManager.MASKS_222_KEY)
        middleBar.setScale(5, 1)


        const limitTimeChallengeButton = new ChallengeSelectionButton(this, width/2, 330, AssetManager.UI_131_KEY, "LIMIT TIME", AssetManager.MASKS_152_KEY)
        limitTimeChallengeButton.setScale(0.6)
        limitTimeChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active")
        })


        const achievementChallengeButton = new ChallengeSelectionButton(this, width/2, 330 + 130, AssetManager.UI_151_KEY, "ACHIEVEMENT", AssetManager.MASKS_111_KEY)
        achievementChallengeButton.setScale(0.6)
        achievementChallengeButton.setPercentage((this.challengeLevels.length-this.countUnfinishedLevels(this.challengeLevels)) / this.challengeLevels.length *100)
        achievementChallengeButton.addOnPressDownCallback(() => {

            const unfinishedLevel = this.getUnfinishedLevel(this.challengeLevels)
            if (unfinishedLevel) {
                const levelCongiguration = new LevelCongiguration(unfinishedLevel, this.challengeLevels.indexOf(unfinishedLevel) + 1)
                this.scene.start(AssetManager.CHALLENGE_GAME_SCENE, levelCongiguration)
                return
            }
            else {
                const finishedLevel = this.getRandomFinishedLevel()
                if (finishedLevel) {
                    const levelCongiguration = new LevelCongiguration(finishedLevel, this.challengeLevels.indexOf(finishedLevel) + 1)
                    this.scene.start(AssetManager.CHALLENGE_GAME_SCENE, levelCongiguration)
                    return
                }
            }
            
        })


        const bounceChallengeButton = new ChallengeSelectionButton(this, width/2, 330 + 130 * 2, AssetManager.UI_88_KEY, "BOUNCE", AssetManager.MASKS_143_KEY)
        bounceChallengeButton.setScale(0.6)
        bounceChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active")
        })

        
        const accurateChallengeButton = new ChallengeSelectionButton(this, width/2, 330 + 130 * 3, AssetManager.UI_4_KEY, "ACCURATE", AssetManager.MASKS_27_KEY)
        accurateChallengeButton.setScale(0.6)
        accurateChallengeButton.addOnPressDownCallback(() => {
            console.log("New Ball Challenge Button is active")
        })

    }

    private getUnfinishedLevel(levelKeys : string[]): string | null {
        for (let i = 0; i < levelKeys.length; i++) {
            const key = levelKeys[i]
            try {
                const levelData = InventoryManager.getInstance().getItem(key)
                if (levelData === undefined) {
                    return key
                }
            }
            catch (e) {
                continue
            }
        }

        return null
    }

    private countUnfinishedLevels(levelKeys: string[]): number {
        let count = 0
        for (let i = 0; i < levelKeys.length; i++) {
            const key = levelKeys[i]
            try {
                const levelData = InventoryManager.getInstance().getItem(key)
                if (levelData === undefined) {
                    count++
                }
            }
            catch (e) {
                continue
            }
        }
        return count
    }


    private getRandomFinishedLevel(): string | null {
        const levelKeys = this.challengeLevels
        const finishedLevelKeys = levelKeys.filter(key => {
            try {
                const levelData = InventoryManager.getInstance().getItem(key)
                if (levelData === undefined) {
                    return false
                }
            }
            catch (e) {
                return true
            }

            return true
        })

        if (finishedLevelKeys.length === 0) {
            return null
        }

        const randomIndex = Math.floor(Math.random() * finishedLevelKeys.length)
        return finishedLevelKeys[randomIndex]
    }

}

export default ChallengeMenuScene