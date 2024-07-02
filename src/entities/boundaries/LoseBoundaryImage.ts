import { Physics } from "phaser";
import HoopSpawner from "../hoops/HoopSpawner";
import BasketballHoop from "../hoops/BasketballHoop";

class LoseBoundaryImage extends Physics.Arcade.Image {

    private spawner : HoopSpawner;

    private offsetX : number;
    private offsetY : number;
    
    
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, offsetX : number, offsetY : number, spawner : HoopSpawner){
        super(scene, x, y, '');


        this.spawner = spawner;

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
        this.setY(hoop.y + this.offsetY);
    }

}


export default LoseBoundaryImage;

