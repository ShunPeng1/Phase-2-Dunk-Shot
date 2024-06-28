import { GameObjects } from "phaser";
import BoundaryImage from "./BoundaryImage";
import BasketballHoop from "./hoops/BasketballHoop";
import InternalHoopArcadeImage from "./hoops/InternalHoopArcadeImage";
import RingHoopArcadeImage from "./hoops/RingHoopArcadeImage";

class Ball extends Phaser.Physics.Arcade.Sprite {
    public readonly arcadeBody: Phaser.Physics.Arcade.Body;

    private worldX: number;
    private worldY: number;

    private bindingHoop: BasketballHoop | null = null;
    private lastBindingHoop: BasketballHoop | null = null;

    
    public readonly INTERNAL_HOOP_OVERLAP_START_EVENT = "internal hoop overlapstart";
    public readonly INTERNAL_HOOP_OVERLAP_END_EVENT = "internal hoop overlapend";
    public readonly RING_HOOP_COLLIDE_EVENT = "collide with ring hoop";
    public readonly WALL_COLLIDE_EVENT = "collide with wall";



    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(this.width /2 );
        this.setDepth(0);
        this.setBounce(1);
        

        this.worldX = x;
        this.worldY = y;

        this.arcadeBody = this.body as Phaser.Physics.Arcade.Body;

        // Add this Ball instance to the scene's update list
        this.scene.events.on('update', this.update, this);

        // Note: It's important to remove the event listener when the Ball is destroyed
        // to prevent memory leaks or unexpected behavior
        this.on('destroy', () => {
            this.scene.events.off('update', this.update, this);
        });


        this.on(this.WALL_COLLIDE_EVENT, this.adjustBounceOnCollidingObject, this);
        this.on(this.RING_HOOP_COLLIDE_EVENT, this.adjustBounceOnCollidingObject, this);


    }

    public update() : void {
        if (this.bindingHoop){
            let internalHoopPosition = this.bindingHoop.getInternalHoopWorldPosition();
            this.worldX = internalHoopPosition.x;
            this.worldY = internalHoopPosition.y;          
        }
        else{
            this.worldX = this.x;
            this.worldY = this.y;
        }


        if (!this.isBinded() && this.wasBinded() && this.arcadeBody.overlapR === 0){
            
            this.endOverlap();
            this.emit("internal hoop overlapend", this.bindingHoop);
        
        }

          
    }

    

    public bindBall(basketballHoop : BasketballHoop) : void{    
        this.bindingHoop = basketballHoop;

        this.setVelocity(0,0);
        //this.setImmovable(true);
        this.arcadeBody.setAllowGravity(false);

        let internalHoopPosition = basketballHoop.getInternalHoopWorldPosition();
        this.worldX = internalHoopPosition.x;
        this.worldY = internalHoopPosition.y;
    
        

        this.setPosition(this.worldX, this.worldY);
    }

    public unbindBall() : void{
        this.lastBindingHoop = this.bindingHoop;

        this.bindingHoop = null;

        //this.setImmovable(false);
        this.arcadeBody.setAllowGravity(true);
    
        //this.setPosition(this.worldX, this.worldY);


    }

    public endOverlap() : void{
        this.lastBindingHoop = null;
    }

    public isBinded() : boolean{
        return this.bindingHoop !== null;
    }

    public wasBinded() : boolean{
        return this.lastBindingHoop !== null;
    }


    public pushBall(force : number, angle : number) : void{
        //this.setImmovable(false);
        this.arcadeBody.setAllowGravity(true);
        

        this.setVelocity(force * Math.cos(angle), force * Math.sin(angle));
    }

    public getWorldPosition() : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.worldX, this.worldY);
    }

    public internalHoopOverlapCallback(ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, internalHoop: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        // You can emit an event from the ball or execute any logic here
        

        if (ball instanceof Ball && internalHoop instanceof InternalHoopArcadeImage) {
            // Now you can use 'ball' to emit events
            
            //var touching = !ball.arcadeBody.touching.none;
            //var touching = ball.arcadeBody.overlapR !==0 ;

            //console.log("touching", touching, "touching noun", !ball.arcadeBody.touching.none, "embedded", ball.arcadeBody.embedded, "binding", ball.isBinded(), "overlaping", ball.arcadeBody.overlapR, ball.arcadeBody.overlapR !==0 );
            //console.log(touching, ball.isBinded(), ball.wasBinded());
            
            let basketballHoop = internalHoop.getBasketballHoop();
            if (!ball.isBinded() && !ball.wasBinded()){
                
                ball.bindBall(basketballHoop);
                ball.emit(ball.INTERNAL_HOOP_OVERLAP_START_EVENT, basketballHoop);
                
            }

        }
    }

    public wallCollisionCallback(ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, wall: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        // You can emit an event from the ball or execute any logic here
        if (ball instanceof Ball && wall instanceof BoundaryImage) {
            ball.emit(ball.WALL_COLLIDE_EVENT, wall);

        }
    }
    
    public hoopCollisionCallback(ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, hoop: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        // You can emit an event from the ball or execute any logic here

        if (ball instanceof Ball && hoop instanceof RingHoopArcadeImage) {
            ball.emit(ball.RING_HOOP_COLLIDE_EVENT, hoop);
        }
    }


        // Collision callback to adjust ball's bounce based on the object it collides with
    private adjustBounceOnCollidingObject(collidedObject : GameObjects.GameObject) {
        // Example: Adjust the ball's bounce property dynamically
        // This can be more complex based on the object properties

        
        if (collidedObject instanceof BoundaryImage) { // Assuming Platform is a class you have for platforms
            this.setBounce(1);
        } 
        else if (collidedObject instanceof RingHoopArcadeImage) {
            this.setBounce(0.5);
        }
    }
}

export default Ball;