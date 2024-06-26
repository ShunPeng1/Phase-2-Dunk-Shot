import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import LineCollider from "./physics/LineCollider";
import InternalHoopArcadeImage from "./InternalHoopArcadeImage";
import RingCollider from "./physics/RingCollider";
import InternalHoopCollider from "./InternalHoopCollider";

class BasketballHoop extends Phaser.GameObjects.Container{
    
    private isInitialized: boolean = false;

    // Components of the basketball hoop
    private innerRing : Phaser.GameObjects.Image;
    private outerRing : Phaser.GameObjects.Image;
    private net : Phaser.GameObjects.Image;
    
    private currentRingScale = 1;
    private currentNetScale = 1;
    
    private readonly RING_RADIUS: number = 83; // Property to store the radius of the circle collider
    
    // Container to hold the hoop components
    private internalHoopContainer: Phaser.GameObjects.Container;


    // Collider properties
    
    private readonly NET_OFFSET_Y = 10; // Vertical offset between components

    private readonly COLLIDER_OFFSET_X: number = 6;
    private readonly COLLIDER_OFFSET_Y: number = 5;
    private readonly COLLIDER_INTERNAL_OFFSET_Y = 30;
    private readonly COLLIDER_INTERNAL_RADIUS = 35;

    private ringCollider: RingCollider;
    private internalHoopCollider: InternalHoopCollider;
    private lineCollider: LineCollider;
    

    private hoopCollider: Phaser.Physics.Arcade.Collider;

    constructor(scene : Scene, x : number, y : number) {
        
        super(scene, x, y);   
        this.scene.add.existing(this);



        this.initImageComponents(scene, x, y); // Initialize the image components

        this.initCircleCollider(scene, x, y); // Initialize the circle collider
        
        this.initInternalHoopComponents(scene, x, y); // Initialize the internal hoop components

        this.isInitialized = true;

        this.updateComponentPosition();
    
    }

    private initImageComponents(scene: Scene, x: number, y: number): void {
        // Load images
        this.innerRing = scene.add.image(x , y , AssetManager.INNER_RING_BASKET_KEY);
        this.innerRing.setDepth(-1);
        

        this.outerRing = scene.add.image(x , y , AssetManager.OUTER_RING_BASKET_KEY);
        this.outerRing.setDepth(2);

        this.net = scene.add.image(x, y + this.NET_OFFSET_Y , AssetManager.NET_BASKET_KEY);
        this.net.setDepth(1);
        this.net.setOrigin(0.5, 0);
    }

    private initCircleCollider(scene: Scene, x: number, y: number): void {

        this.ringCollider = new RingCollider(scene, 0, 0, this.RING_RADIUS, 0, 10);
        this.ringCollider.setOffset(this.COLLIDER_OFFSET_X, this.COLLIDER_OFFSET_Y);
        this.ringCollider.setImmovable(true);
        this.ringCollider.setAllowGravity(false);

        this.add(this.ringCollider);


        // Create the line collider
        this.lineCollider = new LineCollider(this.scene, 0, 0, -this.RING_RADIUS + 5 , this.RING_RADIUS - 5, x => -1/83 * x**2 + 0 * x + this.RING_RADIUS , 20, 20, { type: 'none', key: ''});
        
        this.lineCollider.setOffset(this.COLLIDER_OFFSET_X, this.COLLIDER_OFFSET_Y);
        this.lineCollider.setImmovable(true);
        this.lineCollider.setAllowGravity(false);

        

        this.add(this.lineCollider)
        
    }

    private initInternalHoopComponents(scene: Scene, x: number, y: number): void {
        
        // Create the internal hoop components
        this.internalHoopContainer = scene.add.container(0, this.COLLIDER_INTERNAL_OFFSET_Y);
        this.add(this.internalHoopContainer);


        
        // Create the internal collider
        this.internalHoopCollider = new InternalHoopCollider(scene, 0, this.COLLIDER_INTERNAL_OFFSET_Y, this.COLLIDER_INTERNAL_RADIUS, this);
        this.internalHoopCollider.setOffset(-this.COLLIDER_INTERNAL_RADIUS/2, -this.COLLIDER_INTERNAL_RADIUS/2);
        this.internalHoopCollider.setImmovable(true);
        this.internalHoopCollider.setAllowGravity(false);
        this.internalHoopCollider.setEnable(true); // Make the collider a trigger
    
        this.add(this.internalHoopCollider);
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

        //this.lineCollider.setPosition(x, y,0,0);
        this.internalHoopContainer.setPosition(x, y);

        this.updateComponentPosition();

        return this;
    }

    // Method to set the scale of the basketball hoop components
    public setScale(scaleX: number, scaledY? : number) : this {
        super.setScale(scaleX, scaledY);

        this.currentRingScale = scaleX;

        this.innerRing.setScale(scaleX);
        this.outerRing.setScale(scaleX);
        
        this.internalHoopContainer.setScale(scaleX);

        this.updateComponentPosition();

        return this;
    }
    
    public setRotation(angle: number) : this {
        super.setRotation(angle);

        this.innerRing.setRotation(angle);
        this.outerRing.setRotation(angle);
        this.net.setRotation(angle);

        this.internalHoopContainer.setRotation(angle);

        this.updateComponentPosition();

        return this;
    }

    public getRotation() : number {
        return this.innerRing.rotation;
    }

    public getScale() : number {
        return this.currentRingScale;
    }


    public getInternalHoopContainer(): Phaser.GameObjects.Container {
        return this.internalHoopContainer;
    }

    public enableCollision(ball : Phaser.Types.Physics.Arcade.ArcadeColliderType) : void {

        this.scene.physics.add.collider(ball, this.ringCollider.getColliders());

        // Enable collision between the ball and the line collider
        this.scene.physics.add.collider(ball, this.lineCollider.getColliders());
    }

    public enableOverlap(ball : Phaser.Types.Physics.Arcade.ArcadeColliderType, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) : void {
        if (this.hoopCollider)
        {
            return;
        }

        const internalHoopImage = this.internalHoopCollider.getColliders();
        
        this.hoopCollider = this.scene.physics.add.overlap(ball, internalHoopImage, callback, undefined, this);
    }

    public disableOverlap() : void {
        if (!this.hoopCollider)
        {
            return;
        }
        
        this.scene.physics.world.removeCollider(this.hoopCollider);
    }


    private updateComponentPosition() : void {
        
        // Net scale is relative to the ring scale
        this.net.setScale(this.currentRingScale, this.currentRingScale * this.currentNetScale);
        this.net.y = this.innerRing.y + this.NET_OFFSET_Y * this.currentRingScale - Math.abs(Math.sin(this.innerRing.rotation/2)) * this.currentRingScale * 20;
        this.net.x = this.innerRing.x - Math.sin(this.innerRing.rotation) * this.currentRingScale * 10;

        this.lineCollider.setScale(1, this.currentNetScale);
    }

}



export default BasketballHoop;