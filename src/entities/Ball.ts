import InternalHoopArcadeImage from "./InternalHoopArcadeImage";

class Ball extends Phaser.Physics.Arcade.Sprite {

    public readonly arcadeBody: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(this.width /2 );
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setDepth(1);


        this.arcadeBody = this.body as Phaser.Physics.Arcade.Body;

        // Add this Ball instance to the scene's update list
        this.scene.events.on('update', this.update, this);

        // Note: It's important to remove the event listener when the Ball is destroyed
        // to prevent memory leaks or unexpected behavior
        this.on('destroy', () => {
            this.scene.events.off('update', this.update, this);
        });
    }

    public update() : void {
        
          
    }

    

    public bindBall() : void{    
        this.setVelocity(0,0);
        //this.setImmovable(true);
        this.arcadeBody.setAllowGravity(false);
    }

    public pushBall(force : number, angle : number) : void{
        //this.setImmovable(false);
        this.arcadeBody.setAllowGravity(true);
        

        this.setVelocity(force * Math.cos(angle), force * Math.sin(angle));
    }

    public hoopCollideCallback(ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, internalHoop: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
            // You can emit an event from the ball or execute any logic here
        if (ball instanceof Ball && internalHoop instanceof InternalHoopArcadeImage) {
            // Now you can use 'ball' to emit events
            console.log("collide with hoop");

            var touching = !ball.arcadeBody.touching.none;
            var wasTouching = !ball.arcadeBody.wasTouching.none;
        
            // If you want touching OR embedded then use:
            // var touching = !block.body.touching.none || block.body.embedded;
            
            if (touching && !wasTouching){
                console.log("internal hoop overlapstart");
                ball.emit("internal hoop overlapstart", internalHoop.getBasketballHoop());
            }
            if (!touching && wasTouching) {
                console.log("internal hoop overlapend");
                ball.emit("internal hoop overlapend", internalHoop.getBasketballHoop());

            }

        
            ball.emit('collide with hoop', internalHoop);
            // And 'ball.body' for physics operations, if needed
        }
    }
}

export default Ball;