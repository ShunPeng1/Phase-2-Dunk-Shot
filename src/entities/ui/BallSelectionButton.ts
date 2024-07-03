import InventoryManager from "../../managers/InventoryManager";
import UiImageButton from "../../ultilities/ui/UiImageButton";

class BallSelectionButton extends UiImageButton {
    private isUnlocked: boolean = false;
    private ballKey: string;

    private costText: Phaser.GameObjects.Text; // For displaying the cost
    private maskGraphics: Phaser.GameObjects.Graphics; // For the gray mask
    private cost: number = 0;


    constructor(scene: Phaser.Scene, x: number, y: number, key: string, cost: number) {
        super(scene, x, y, key);

        this.ballKey = key;

        this.cost = cost;

        InventoryManager.getInstance().getItem(key) ? this.unlock() : this.lock();

    }

    private unlock(): void {
        this.isUnlocked = true;
        this.costText.destroy();
        this.maskGraphics.destroy();
    }

    private lock(): void {
        this.isUnlocked = false;

        this.createGrayMask();
        this.createCostBanner(this.cost);
    }


    private createGrayMask(): void {
        // Create a gray rectangle mask with alpha 0.5
        this.maskGraphics = this.scene.add.graphics({ x: this.x, y: this.y });
        this.maskGraphics.fillStyle(0x808080, 0.5); // Gray color, 50% opacity
        this.maskGraphics.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.maskGraphics.setDepth(1); // Ensure it's above the button but below the cost banner
    }

    private createCostBanner(cost: number): void {
        // Create a text object for the cost banner
        this.costText = this.scene.add.text(this.x, this.y + this.height / 2, `Cost: ${cost}`, {
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 5, right: 5, top: 2, bottom: 2 },
        }).setOrigin(0.5, 0); // Center horizontally, align to bottom of the button
        this.costText.setDepth(2); // Ensure it's above the mask
    }

}