import { Physics } from "phaser";
import HoopSpawner from "./hoops/HoopSpawner";
import BasketballHoop from "./hoops/BasketballHoop";

class LoseBoundaryImage extends Physics.Arcade.Image {

    private spawner : HoopSpawner;
    private initialHoop : BasketballHoop;

    private isFirstHoop : boolean = true;

    private offsetX : number;
    private offsetY : number;
    
    
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, offsetX : number, offsetY : number, spawner : HoopSpawner, initialHoop : BasketballHoop){
        super(scene, x, y, '');


        this.spawner = spawner;
        this.initialHoop = initialHoop;

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.height = height;


        scene.physics.add.existing(this);

        this.setImmovable(true);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        this.setSize(this.width, this.height);
        this.setVisible(false);


        this.spawner.subscribeToEnterNextHoop(this.onHoopEnter.bind(this));

    }

    public enableOverlap(collider: Phaser.GameObjects.GameObject, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback): void {

        this.scene.physics.add.overlap(collider, this, callback, undefined, this.scene);
    }


    private onHoopEnter(hoop : BasketballHoop) : void {
        if (hoop != this.initialHoop) {
            this.setY(hoop.y + this.offsetY);
            this.isFirstHoop = false;
        }

    }

    public getIsFirstHoop() : boolean {
        return this.isFirstHoop;
    }

}


export default LoseBoundaryImage;

