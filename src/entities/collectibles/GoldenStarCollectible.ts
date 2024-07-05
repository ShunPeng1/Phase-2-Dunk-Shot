import AssetManager from "../../managers/AssetManager";
import InventoryManager from "../../managers/InventoryManager";
import BasketballHoop from "../hoops/BasketballHoop";
import Collectible from "./Collectible";

class GoldenStarCollectible extends Collectible {
    
    constructor(scene: Phaser.Scene, x: number, y: number, basketballHoop: BasketballHoop ) {
        super(scene, x, y, AssetManager.GOLDEN_STAR_KEY, basketballHoop);

        this.createIdleAnimation();
    }
    

    public collect(collector? : Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    
        InventoryManager.getInstance().addItem(AssetManager.GOLDEN_STAR_INVENTORY_KEY, 1);
        this.disableOverlap();
    }

    private createIdleAnimation() {
        this.scene.tweens.add({
            targets: this,
            y: this.y - 10,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 1000,
        });
    }

    public createCollectAnimation(position: Phaser.Math.Vector2) {
        this.scene.tweens.add({
            targets: this,
            x: position.x,
            y: position.y,
            ease: 'Back.easeIn',
            duration: 1500,
            onComplete: () => {
                this.destroy();
            }
        });

        this.scene.tweens.add({
            targets: this,
            angle: 360, 
            loop: -1,
            ease: 'Linear',
            duration: 500,
        });
    }

}

export default GoldenStarCollectible;