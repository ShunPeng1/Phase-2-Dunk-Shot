import { Scene } from "phaser";
import AssetManager from "../AssetManager";

class BasketballHoop {
    private innerRing : Phaser.GameObjects.Image;
    private outerRing : Phaser.GameObjects.Image;
    private net : Phaser.GameObjects.Image;
    
    private currentRingScale = 1;
    private currentNetScale = 1;
    private readonly netOffsetY = 10; // Vertical offset between components
    

    constructor(scene : Scene, x : number, y : number) {
        

        // Load images
        this.innerRing = scene.add.image(x, y, AssetManager.INNER_RING_BASKET_KEY);
        this.innerRing.setDepth(-1);

        this.outerRing = scene.add.image(x, y, AssetManager.OUTER_RING_BASKET_KEY);
        this.outerRing.setDepth(2);

        this.net = scene.add.image(x, y + this.netOffsetY , AssetManager.NET_BASKET_KEY);
        this.net.setDepth(1);
        this.net.setOrigin(0.5, 0);

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

        this.currentNetScale = scale;

        this.updateNetPosition();
    }

    
    public setPosition(x: number, y: number) : void {
        this.innerRing.setPosition(x, y);
        this.outerRing.setPosition(x, y);
        this.net.setPosition(x, y + this.netOffsetY); // Adjust the Y offset as needed
    }

    // Method to set the scale of the basketball hoop components
    public setScale(scale: number) : void {
        this.currentRingScale = scale;

        this.innerRing.setScale(scale);
        this.outerRing.setScale(scale);
    
        this.updateNetPosition();
    }

    private updateNetPosition() : void {
        
        this.net.setScale(this.currentRingScale, this.currentRingScale * this.currentNetScale);
        this.net.y = this.innerRing.y + this.netOffsetY * this.currentRingScale;
    }

    public setRotation(angle: number) : void {
        this.innerRing.setRotation(angle);
        this.outerRing.setRotation(angle);
        this.net.setRotation(angle);
    }
}



export default BasketballHoop;