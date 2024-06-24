import { Scene } from "phaser";
import AssetManager from "../AssetManager";

class BasketballHoop {
    private innerRing : Phaser.GameObjects.Image;
    private outerRing : Phaser.GameObjects.Image;
    private net : Phaser.GameObjects.Image;
    
    private readonly netOffsetY = 45; // Vertical offset between components
    

    constructor(scene : Scene, x : number, y : number) {
        

        // Load images
        this.innerRing = scene.add.image(x, y, AssetManager.INNER_RING_BASKET_KEY);
        this.innerRing.setDepth(-1);

        this.outerRing = scene.add.image(x, y, AssetManager.OUTER_RING_BASKET_KEY);
        this.outerRing.setDepth(2);

        this.net = scene.add.image(x, y + this.netOffsetY , AssetManager.NET_BASKET_KEY);
        this.net.setDepth(1);

        // You can add more properties or methods to this class as needed
    }


    public setRingTint(color: number) : void {
        this.innerRing.setTint(color);
        this.outerRing.setTint(color);        
    }


    public setNetScale(scale: number) : void {
        if (scale < 1) {
            scale = 1;
        }
        if (scale > 3) {
            scale = 3;
        }

        this.net.setScale(1, scale);
        this.net.y = this.innerRing.y + this.netOffsetY * Math.pow(scale, 0.75);
    }
}



export default BasketballHoop;