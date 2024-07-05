import AssetManager from "../../managers/AssetManager";
import InventoryManager from "../../managers/InventoryManager";
import UiImageButton from "../../ultilities/ui/UiImageButton";

class BallSelectionButton extends UiImageButton {
    private static lastSelected: BallSelectionButton;
    private isUnlocked: boolean = false;
    private isSelecting: boolean = false;
    private ballKey: string;

    private costText: Phaser.GameObjects.Text; // For displaying the cost
    private maskGraphics: Phaser.GameObjects.Graphics; // For the gray mask
    private selectedGraphics: Phaser.GameObjects.Graphics; // For the selected border
    private costPanel: Phaser.GameObjects.Image;
    private starImage: Phaser.GameObjects.Image;
    
    private cost: number = 0;


    constructor(scene: Phaser.Scene, x: number, y: number, key: string, cost: number) {
        super(scene, x, y, key);
        console.log("Creating Ball Selection Button", key);
        this.ballKey = key;
        this.cost = cost;

        this.createSelectedBorder();
        InventoryManager.getInstance().getItem(key) ? this.unlock() : this.lock();
        


        this.addOnPressUpCallback(() => {
            if (this.isUnlocked){
                this.selectBall();
            }
            else{    
                this.tryBuy();
            }
        });

    }

    private unlock(): void {
        this.isUnlocked = true;
        this.costText?.destroy();
        this.maskGraphics?.destroy();
        this.costPanel?.destroy();
        this.starImage?.destroy();
        

        if (InventoryManager.getInstance().getItem(AssetManager.BALL_SKIN_INVENTORY_KEY) == this.ballKey) {
            this.selectBall();
        }
    }

    private lock(): void {
        this.isUnlocked = false;
        
        this.createGrayMask();
        this.createCostBanner(this.cost);
    }


    private createGrayMask(): void {
        // Create a gray rectangle mask with alpha 0.5
        this.maskGraphics = this.scene.add.graphics({ x: 0, y: 0 });
        this.maskGraphics.fillStyle(0x808080, 0.5); // Gray color, 50% opacity
        this.maskGraphics.fillCircle(0, 0, this.width/2  * 1.1);
        
        this.maskGraphics.setDepth(-1); // Ensure it's above the button but below the cost banner

        this.add(this.maskGraphics); // Add the mask to the button
        this.container.bringToTop(this.maskGraphics); // Ensure it's above the button but below the cost banner
    }

    private createSelectedBorder(): void {
        if (this.selectedGraphics) {
            return;
        }

        // Create a white rectangle border
        this.selectedGraphics = this.scene.add.graphics({ x: 0, y: 0 });
        this.selectedGraphics.fillStyle(0xffd500, 1);
        this.selectedGraphics.fillCircle(0, 0, this.width/2 * 1.3);
        
        this.selectedGraphics.setDepth(-1);

        this.add(this.selectedGraphics); // Add the border to the button
        this.container.sendToBack(this.selectedGraphics);
        
        if (InventoryManager.getInstance().getItem(AssetManager.BALL_SKIN_INVENTORY_KEY) == this.ballKey) {
            this.selectedGraphics.setVisible(true);
        }
        else {
            this.selectedGraphics.setVisible(false);
        }
    }

    private createCostBanner(cost: number): void {
        
        let panel = this.scene.add.image(0, this.height / 2, AssetManager.MASKS_50_KEY);
        panel.setOrigin(0.5, 0.5);
        
        panel.setDepth(2);
        panel.setTint(0xff8b00); // Black color
        this.add(panel);

        
        this.costPanel = panel;
        
        let starImage = this.scene.add.image(-40, this.height / 2 - 5, AssetManager.UI_19_KEY);
        starImage.setOrigin(0.5, 0.5);
        starImage.setScale(0.85);
        starImage.setDepth(2);
        this.add(starImage);

        this.starImage = starImage;

        // Create a text object for the cost banner
        this.costText = this.scene.add.text(30, this.height / 2 - 30, `${cost}`, {
            fontSize: '46px',
            fontFamily: 'bold Arial',
            color: '#ffffff',
            padding: { left: 5, right: 5, top: 2, bottom: 2 },
        }).setOrigin(0.5, 0); // Center horizontally, align to bottom of the button
        this.costText.setDepth(2); // Ensure it's above the mask
    
        this.add(this.costText); // Add the text to the button


    }

    public getBallKey(): string {
        return this.ballKey;
    }

    private selectBall(): void {
        if (this.isSelecting) {
            return;
        }

        this.isSelecting = true;

        InventoryManager.getInstance().setItem(AssetManager.BALL_SKIN_INVENTORY_KEY, this.ballKey);
    
        this.selectedGraphics?.setVisible(true);

        BallSelectionButton.lastSelected?.deselectBall();
        BallSelectionButton.lastSelected = this;
    }

    public deselectBall(): void {
        this.isSelecting = false;
        
        this.selectedGraphics?.setVisible(false);
    }
    
    private tryBuy(): void {
        let star = InventoryManager.getInstance().getItemAsNumber(AssetManager.GOLDEN_STAR_INVENTORY_KEY);

        if (!star) return;

        if (star >= this.cost) {
            InventoryManager.getInstance().addItem(AssetManager.GOLDEN_STAR_INVENTORY_KEY, -this.cost);
            InventoryManager.getInstance().addItem(this.ballKey, 1);
            this.unlock();
        }


    }

}


export default BallSelectionButton;