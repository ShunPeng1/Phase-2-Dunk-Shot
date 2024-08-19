import StarText from "../entities/scores/StarText"
import BallSelectionButton from "../entities/ui/BallSelectionButton"
import AssetManager from "../managers/AssetManager"
import DunkShotGameStateManager from "../managers/DunkShotGameStateManager"
import InventoryManager from "../managers/InventoryManager"
import UiGridLayout from "../utilities/ui/UiGridLayout"
import UiImage from "../utilities/ui/UiImage"
import UiImageButton from "../utilities/ui/UiImageButton"
import UiUtilities from "../utilities/ui/UiUtilities"


class CustomizeUIScene extends Phaser.Scene {
    private gameStateManager: DunkShotGameStateManager
    private defaultBall: string = AssetManager.BASKETBALL_KEY

    
    private coinUpdateFuction: (old: string, value: string) => void


    constructor() {
        super(AssetManager.CUSTOMIZE_UI_SCENE)
    }

    init(data: DunkShotGameStateManager) {
        this.gameStateManager = data

    }

    create() {
        const { width: widthConfig, height: heightConfig } = this.sys.game.config
        const width = Number(widthConfig) as any
        const height = Number(heightConfig) as any
        
        const overlay = this.add.graphics()
        overlay.fillStyle(0xe8e8e8, 1)
        overlay.fillRect(0, 0, width, height)
        

        const topBar = new UiImage(this, 0, -30, AssetManager.MASKS_TOP_WAVY_KEY)
        topBar.setOrigin(0, 0)
        

        const backButton = new UiImageButton(this, 40, 15, AssetManager.MASKS_LEFT_TRIANGLE_KEY)
        backButton.setOrigin(0, 0)
        backButton.setScale(0.6)
        backButton.addOnPressDownCallback(() => {
            console.log("Back button is active")
            this.gameStateManager.loadPreviousUI()
        })
        backButton.setDepth(10000)

        this.setupStarManagement()


        const adButton = new UiImageButton(this, width/2, 150, AssetManager.UI_AD_WIDE_KEY)

        adButton.setScale(0.6)

        adButton.addOnPressDownCallback(() => {
            console.log("Ad button is active")
        })

        const middleBar = new UiImage(this, width/2, 240, AssetManager.MASKS_222_KEY)
        middleBar.setScale(5, 1)

        //let ballImagePrefab = new UiImage(this, width/2, 400, AssetManager.BASKETBALL_KEY);
        //ballImagePrefab.setScale(0.5);
        //this.children.remove(ballImagePrefab);

        const allBalls : string[]= AssetManager.ALL_BALL_KEYS


        const grid = new UiGridLayout(this, 100, 350, 0, 0, 200, 200) 
        grid.createGrid(3, allBalls.length, (scene: Phaser.Scene, x: number, y: number, index: number) => {
            const ballSelectionButton = new BallSelectionButton(scene, x, y, allBalls[index], 100)
            
            ballSelectionButton.setScale(0.6)
            UiUtilities.applyButtonScaleTweens(ballSelectionButton)
            return ballSelectionButton.container
        }, true)
        this.add.existing(grid)
        

        const maskGraphics = this.add.graphics().setVisible(false).fillRect(0, 240, 700, 8000)
        const mask = maskGraphics.createGeometryMask()
        
        grid.setMask(mask)
        this.enableScrolling(grid, 700, 8000)

    }

    
    private enableScrolling(grid : Phaser.GameObjects.Components.Transform & { height: number }, maskWidth: number, maskHeight: number): void {
        let startY = 0
        let scrolling = false
    
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (pointer.x >= grid.x && pointer.x <= grid.x + maskWidth && pointer.y >= grid.y && pointer.y <= grid.y + maskHeight) {
                startY = pointer.y
                scrolling = true

            }
        }, this)
    
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (scrolling) {
                const deltaY = pointer.y - startY
                grid.y += deltaY
                startY = pointer.y
    
                
                // Clamp the y position
                grid.y = Phaser.Math.Clamp(grid.y, -4300, 350)
            }
        }, this)
    
        this.input.on('pointerup', () => {
            scrolling = false
        }, this)
    }
    
    private setupStarManagement() : void {
        const starText = new StarText(this, 530, 90, '0', { 
            fontSize: 'bold 40px', 
            fontFamily: 'Arial', // Specify a bold font family
            color: '#f2a63b', // Example color: white
            align: 'center' // Ensure the text is centered
            }
        )

        starText.setScale(0.75)
        starText.setOrigin(0.5, 0.5) // Center the origin of the text for accurate positioning
        starText.setScrollFactor(0, 0) // This line makes the score text follow the camera
   
        starText.updateStar(InventoryManager.getInstance().getItemAsNumber(AssetManager.GOLDEN_STAR_INVENTORY_KEY))
        
        const coinUpdate = (old: string, value: string): void =>{
            starText.updateStar(parseInt(value))
        }

        this.coinUpdateFuction = coinUpdate.bind(this)

        InventoryManager.getInstance().subscribe(AssetManager.GOLDEN_STAR_INVENTORY_KEY, this.coinUpdateFuction)

        starText.on('destroy', () => {
            InventoryManager.getInstance().unsubscribe(AssetManager.GOLDEN_STAR_INVENTORY_KEY, this.coinUpdateFuction)
        })

    }

    
}

export default CustomizeUIScene