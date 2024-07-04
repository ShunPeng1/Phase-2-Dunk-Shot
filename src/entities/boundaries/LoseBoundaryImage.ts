import { Physics } from "phaser";
import HoopSpawner from "../hoops/HoopSpawner";
import BasketballHoop from "../hoops/BasketballHoop";
import BallInteraction from "../balls/BallInteraction";

class LoseBoundaryImage extends Physics.Arcade.Image {

    private ballInteraction : BallInteraction;

    private offsetX : number;
    private offsetY : number;
    
    
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, offsetX : number, offsetY : number, ballInteraction : BallInteraction){
        super(scene, x, y, '');


        this.ballInteraction = ballInteraction;

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.height = height;


        scene.physics.add.existing(this);

        this.setImmovable(true);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

        this.setSize(this.width, this.height);
        this.setVisible(false);


        this.ballInteraction.on(BallInteraction.ENTER_NEXT_HOOP_EVENT, this.onHoopEnter.bind(this));

    }

    public enableOverlap(collider: Phaser.GameObjects.GameObject, callback?: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback): void {

        this.scene.physics.add.overlap(collider, this, callback, undefined, this.scene);
    }


    private onHoopEnter(hoop : BasketballHoop) : void {
        let hoopWorldPosition = hoop.getWorldTransformMatrix();
        //this.setX(hoopWorldPosition.tx + this.offsetX);

        this.setY(hoopWorldPosition.ty + this.offsetY);
    }

}


export default LoseBoundaryImage;

