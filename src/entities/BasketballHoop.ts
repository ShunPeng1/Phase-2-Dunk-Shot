import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import LineCollider from "./physics/LineCollider";

class BasketballHoop extends Phaser.GameObjects.Container{
    private isInitialized: boolean = false;

    // Components of the basketball hoop
    private innerRing : Phaser.GameObjects.Image;
    private outerRing : Phaser.GameObjects.Image;
    private net : Phaser.GameObjects.Image;
    
    private currentRingScale = 1;
    private currentNetScale = 1;
    
    private ringRadiusX: number = 83; // Property to store the radius of the circle collider
    
    // Collider properties
    
    private readonly NET_OFFSET_Y = 10; // Vertical offset between components

    private readonly COLLIDER_OFFSET_X: number = -76;
    private readonly COLLIDER_OFFSET_Y: number = 0;
    private readonly COLLIDER_MIDDLE_OFFSET_Y: number = -80;
    private readonly COLLIDER_MIDDLE_RADIUS = 35;

    private leftColliderImage: Phaser.Physics.Arcade.Image;
    private rightColliderImage: Phaser.Physics.Arcade.Image;
    private middleColliderImage: Phaser.Physics.Arcade.Image;
    private lineCollider: LineCollider;

    private hoopCollider: Phaser.Physics.Arcade.Collider;

    constructor(scene : Scene, x : number, y : number) {
        
        super(scene, x, y);   

        // Load images
        this.innerRing = scene.add.image(x, y, AssetManager.INNER_RING_BASKET_KEY);
        this.innerRing.setDepth(-1);

        this.outerRing = scene.add.image(x, y, AssetManager.OUTER_RING_BASKET_KEY);
        this.outerRing.setDepth(2);

        this.net = scene.add.image(x, y + this.NET_OFFSET_Y , AssetManager.NET_BASKET_KEY);
        this.net.setDepth(1);
        this.net.setOrigin(0.5, 0);


        this.initCircleCollider(scene, x, y); // Initialize the circle collider
        
        this.isInitialized = true;

        this.updateComponentPosition();
    
    }

    private initCircleCollider(scene: Scene, x: number, y: number): void {
        // Create the left collider
        console.log(this.innerRing.width, this.ringRadiusX,  x - this.ringRadiusX);

        this.leftColliderImage = scene.physics.add.image(x + this.COLLIDER_OFFSET_X - this.ringRadiusX, 0, "");
        this.leftColliderImage.setCircle(this.innerRing.width / 20);
        this.leftColliderImage.setImmovable(true);
        this.leftColliderImage.setVisible(false);
        this.leftColliderImage.setDepth(-1);
        (this.leftColliderImage.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        // Create the right collider
        this.rightColliderImage = scene.physics.add.image(x + this.COLLIDER_OFFSET_X + this.ringRadiusX, 0, "");
        this.rightColliderImage.setCircle(this.innerRing.width / 20);
        this.rightColliderImage.setImmovable(true);
        this.rightColliderImage.setVisible(false);
        this.rightColliderImage.setDepth(-1);
        (this.rightColliderImage.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);


        // Create the middle collider
        this.middleColliderImage = scene.physics.add.image(x + this.COLLIDER_OFFSET_X, 0, "");
        this.middleColliderImage.setCircle(this.COLLIDER_MIDDLE_RADIUS);
        this.middleColliderImage.setImmovable(true);
        this.middleColliderImage.setVisible(false);
        this.middleColliderImage.setDepth(-1);
        (this.middleColliderImage.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        (this.middleColliderImage.body as Phaser.Physics.Arcade.Body).setEnable(true); // Make the collider a trigger

        

        // Create the line collider
        
        const lineCollider = new LineCollider(this.scene, x + this.COLLIDER_OFFSET_X +  this.ringRadiusX, y, -this.ringRadiusX , this.ringRadiusX, x => -1/83 * x**2 + 0 * x + this.ringRadiusX , 20, 20, { type: 'none', key: ''});
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

    
    public setPosition(x: number, y: number) : this {
        super.setPosition(x, y);

        if (!this.isInitialized) {
            return this;
        }

        this.innerRing.setPosition(x, y);
        this.outerRing.setPosition(x, y);
        this.net.setPosition(x, y + this.NET_OFFSET_Y); // Adjust the Y offset as needed

        this.lineCollider.setPosition(x, y,0,0);

        this.updateComponentPosition();

        return this;
    }

    // Method to set the scale of the basketball hoop components
    public setScale(scaleX: number, scaledY? : number) : this {
        super.setScale(scaleX, scaledY);

        this.currentRingScale = scaleX;

        this.innerRing.setScale(scaleX);
        this.outerRing.setScale(scaleX);
        
        
    
        this.updateComponentPosition();

        return this;
    }
    
    public setRotation(angle: number) : this {
        super.setRotation(angle);

        this.innerRing.setRotation(angle);
        this.outerRing.setRotation(angle);
        this.net.setRotation(angle);

        this.lineCollider.setRotation(angle);

        this.updateComponentPosition();

        return this;
    }

    public getRotation() : number {
        return this.innerRing.rotation;
    }

    public getScale() : number {
        return this.currentRingScale;
    }



    public enableCollision(ball : Phaser.Types.Physics.Arcade.ArcadeColliderType) : void {

        // Enable collision between the ball and the left collider of the hoop
        this.scene.physics.add.collider(ball, this.leftColliderImage);

        // Enable collision between the ball and the right collider of the hoop
        this.scene.physics.add.collider(ball, this.rightColliderImage);

        // Enable collision between the ball and the line collider
        this.scene.physics.add.collider(ball, this.lineCollider.getColliders());
    }

    public enableOverlap(ball : Phaser.Types.Physics.Arcade.ArcadeColliderType, callback: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) : void {
        this.hoopCollider = this.scene.physics.add.overlap(ball, this.middleColliderImage, callback, undefined, this);
    }

    public disableOverlap(ball : Phaser.Types.Physics.Arcade.ArcadeColliderType) : void {
        this.scene.physics.world.removeCollider(this.hoopCollider);
    }



    private updateComponentPosition() : void {
        
        // Net scale is relative to the ring scale
        this.net.setScale(this.currentRingScale, this.currentRingScale * this.currentNetScale);
        this.net.y = this.innerRing.y + this.NET_OFFSET_Y * this.currentRingScale - Math.abs(Math.sin(this.innerRing.rotation/2)) * this.currentRingScale * 20;
        this.net.x = this.innerRing.x - Math.sin(this.innerRing.rotation) * this.currentRingScale * 10;

        // Update colliders' scale to match the ring's scale
        this.leftColliderImage.setScale(this.currentRingScale);
        this.rightColliderImage.setScale(this.currentRingScale);
        this.middleColliderImage.setScale(this.currentRingScale);
        
        // Update the line collider
        this.lineCollider.setScale(this.currentRingScale, this.currentRingScale * this.currentNetScale);
        

        // Calculate new positions for the colliders based on the hoop's rotation
        const angle = this.innerRing.rotation;
        const cosAngle = Math.cos(angle + Math.PI/2);
        const sinAngle1 = Math.sin((angle + Math.PI * 1.5)) + 1;
        const sinAngle2 = Math.sin(angle + Math.PI * 0.5) + 1;
        const radiusX = this.ringRadiusX * this.currentRingScale;
        const offsetX = this.COLLIDER_OFFSET_X * this.currentRingScale;
        const offsetY = this.COLLIDER_OFFSET_Y * this.currentRingScale;
        const middleOffsetY = this.COLLIDER_MIDDLE_OFFSET_Y * this.currentRingScale;
        const middleRadius = this.COLLIDER_MIDDLE_RADIUS * this.currentRingScale;
        
        this.leftColliderImage.x = this.innerRing.x + offsetX + radiusX * sinAngle1;
        this.leftColliderImage.y = this.innerRing.y + offsetY + radiusX * cosAngle;

        this.rightColliderImage.x = this.innerRing.x + offsetX + radiusX * sinAngle2;
        this.rightColliderImage.y = this.innerRing.y + offsetY - radiusX * cosAngle;


        this.leftColliderImage.setRotation(angle);
        this.rightColliderImage.setRotation(angle);

        this.middleColliderImage.x = this.innerRing.x + offsetX + radiusX * (cosAngle * 0.5) + middleRadius * 1.5 ;
        this.middleColliderImage.y = this.innerRing.y + middleOffsetY + radiusX * sinAngle2 * 0.55;
        this.middleColliderImage.setRotation(angle);

    }

}



export default BasketballHoop;