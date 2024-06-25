import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import LineCollider from "./physics/LineCollider";

class BasketballHoop {
    
    private scene : Scene;

    // Components of the basketball hoop
    private innerRing : Phaser.GameObjects.Image;
    private outerRing : Phaser.GameObjects.Image;
    private net : Phaser.GameObjects.Image;
    
    private currentRingScale = 1;
    private currentNetScale = 1;
    private readonly netOffsetY = 10; // Vertical offset between components

    
    private ringRadiusX: number = 83; // Property to store the radius of the circle collider
    
    // Collider properties
    private colliderOffsetX: number = -76;
    private colliderOffsetY: number = 0;

    private leftCollider: Phaser.Physics.Arcade.Image;
    private rightCollider: Phaser.Physics.Arcade.Image;
    private lineCollider: LineCollider;

    private DEBUG = true;

    constructor(scene : Scene, x : number, y : number) {
        this.scene = scene;        

        // Load images
        this.innerRing = scene.add.image(x, y, AssetManager.INNER_RING_BASKET_KEY);
        this.innerRing.setDepth(-1);

        this.outerRing = scene.add.image(x, y, AssetManager.OUTER_RING_BASKET_KEY);
        this.outerRing.setDepth(2);

        this.net = scene.add.image(x, y + this.netOffsetY , AssetManager.NET_BASKET_KEY);
        this.net.setDepth(1);
        this.net.setOrigin(0.5, 0);


        this.initCircleCollider(scene, x, y); // Initialize the circle collider

        this.updateComponentPosition();
    
    }

    private initCircleCollider(scene: Scene, x: number, y: number): void {
        // Create the left collider
        console.log(this.innerRing.width, this.ringRadiusX,  x - this.ringRadiusX);

        this.leftCollider = scene.physics.add.image(x + this.colliderOffsetX - this.ringRadiusX, 0, "");
        this.leftCollider.setCircle(this.innerRing.width / 20);
        this.leftCollider.setImmovable(true);
        this.leftCollider.setVisible(false);
        this.leftCollider.setDepth(-1);
        (this.leftCollider.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        // Create the right collider
        this.rightCollider = scene.physics.add.image(x + this.colliderOffsetX + this.ringRadiusX, 0, "");
        this.rightCollider.setCircle(this.innerRing.width / 20);
        this.rightCollider.setImmovable(true);
        this.rightCollider.setVisible(false);
        this.rightCollider.setDepth(-1);
        (this.rightCollider.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);


        // Create the line collider
        
        
        const lineCollider = new LineCollider(this.scene, x + this.colliderOffsetX +  this.ringRadiusX, y, -this.ringRadiusX , this.ringRadiusX, x => -1/83 * x**2 + 0 * x + this.ringRadiusX , 20, 20, { type: 'none', key: ''});
        this.lineCollider = lineCollider;

        lineCollider.setImmovable(true);
        lineCollider.setAllowGravity(false);
        
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

        this.updateComponentPosition();
    }

    
    public setPosition(x: number, y: number) : void {
        this.innerRing.setPosition(x, y);
        this.outerRing.setPosition(x, y);
        this.net.setPosition(x, y + this.netOffsetY); // Adjust the Y offset as needed

        this.lineCollider.setPosition(x, y,0,0);
    }

    // Method to set the scale of the basketball hoop components
    public setScale(scale: number) : void {
        this.currentRingScale = scale;

        this.innerRing.setScale(scale);
        this.outerRing.setScale(scale);
        
        this.lineCollider.setScale(scale, scale);
    
        this.updateComponentPosition();
    }
    
    public setRotation(angle: number) : void {
        this.innerRing.setRotation(angle);
        this.outerRing.setRotation(angle);
        this.net.setRotation(angle);

        this.lineCollider.setRotation(angle);

        this.updateComponentPosition();
    }

    public getRotation() : number {
        return this.innerRing.rotation;
    }

    public getScale() : number {
        return this.currentRingScale;
    }



    public enableCollision(ball : Phaser.Types.Physics.Arcade.ArcadeColliderType) : void {

        // Enable collision between the ball and the left collider of the hoop
        this.scene.physics.add.collider(ball, this.leftCollider);

        // Enable collision between the ball and the right collider of the hoop
        this.scene.physics.add.collider(ball, this.rightCollider);

        // Enable collision between the ball and the line collider
        this.scene.physics.add.collider(ball, this.lineCollider.getColliders());
    }

    private updateComponentPosition() : void {
        
        // Net scale is relative to the ring scale
        this.net.setScale(this.currentRingScale, this.currentRingScale * this.currentNetScale);
        this.net.y = this.innerRing.y + this.netOffsetY * this.currentRingScale - Math.abs(Math.sin(this.innerRing.rotation/2)) * this.currentRingScale * 20;
        this.net.x = this.innerRing.x - Math.sin(this.innerRing.rotation) * this.currentRingScale * 10;

        // Update colliders' scale to match the ring's scale
        this.leftCollider.setScale(this.currentRingScale);
        this.rightCollider.setScale(this.currentRingScale);

        

        // Calculate new positions for the colliders based on the hoop's rotation
        const angle = this.innerRing.rotation;
        const cosAngle = Math.cos(angle + Math.PI/2);
        const sinAngle1 = Math.sin((angle + Math.PI * 1.5)) + 1;
        const sinAngle2 = Math.sin(angle + Math.PI * 0.5) + 1;
        const radiusX = this.ringRadiusX * this.currentRingScale;
        const offsetX = this.colliderOffsetX * this.currentRingScale;
        const offsetY = this.colliderOffsetY * this.currentRingScale;
        
        this.leftCollider.x = this.innerRing.x + offsetX + radiusX * sinAngle1;
        this.leftCollider.y = this.innerRing.y + offsetY + radiusX * cosAngle;

        this.rightCollider.x = this.innerRing.x + offsetX + radiusX * sinAngle2;
        this.rightCollider.y = this.innerRing.y + offsetY - radiusX * cosAngle;


        this.leftCollider.setRotation(angle);
        this.rightCollider.setRotation(angle);

        
        
    }

}



export default BasketballHoop;