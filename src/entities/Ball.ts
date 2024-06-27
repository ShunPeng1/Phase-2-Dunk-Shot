import BasketballHoop from "./BasketballHoop";
import InternalHoopArcadeImage from "./InternalHoopArcadeImage";

class Ball extends Phaser.Physics.Arcade.Sprite {
    private trajectoryGraphics: Phaser.GameObjects.Graphics;

    public readonly arcadeBody: Phaser.Physics.Arcade.Body;

    private worldX: number;
    private worldY: number;

    private bindingHoop: BasketballHoop | null = null;
    private lastBindingHoop: BasketballHoop | null = null;



    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(this.width /2 );
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setDepth(1);

        this.worldX = x;
        this.worldY = y;

        this.arcadeBody = this.body as Phaser.Physics.Arcade.Body;

        this.trajectoryGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xffff00 } });


        // Add this Ball instance to the scene's update list
        this.scene.events.on('update', this.update, this);

        // Note: It's important to remove the event listener when the Ball is destroyed
        // to prevent memory leaks or unexpected behavior
        this.on('destroy', () => {
            this.scene.events.off('update', this.update, this);
        });
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

    public drawTrajectory(force: number, angle: number, maxDistance: number, maxIteration: number, skipping : number): void {
        // Clear the previous trajectory line
        this.trajectoryGraphics.clear();
        const forceVector = new Phaser.Math.Vector2(force * Math.cos(angle), force * Math.sin(angle));
        // Start drawing the trajectory
        this.trajectoryGraphics.lineStyle(2, 0xffff00, 1);
    
        let startPosition = new Phaser.Math.Vector2(this.worldX, this.worldY);
        let currentPosition = new Phaser.Math.Vector2(this.worldX, this.worldY);
        let velocity = new Phaser.Math.Vector2(forceVector.x, forceVector.y);
        let gravity = this.scene.physics.world.gravity;
    
        // Predict the trajectory

        for (let i = 0; i < maxIteration; i += skipping) {
            let time = i / this.scene.physics.world.fps; // Convert iteration to seconds
            let dx = startPosition.x + velocity.x * time;
            let dy = startPosition.y + velocity.y * time + 0.5 * gravity.y * time * time;
    
            currentPosition.set(dx, dy);
            let distanceTraveled = Phaser.Math.Distance.Between(startPosition.x, startPosition.y, currentPosition.x, currentPosition.y);
    
            // End the loop if the distance traveled exceeds the maximum distance
            if (distanceTraveled > maxDistance) {
                break;
            }
    
            if (i === 0) {
                this.trajectoryGraphics.beginPath();
                this.trajectoryGraphics.moveTo(dx, dy);
            } else {
                this.trajectoryGraphics.lineTo(dx, dy);
            }

        }
    
        this.trajectoryGraphics.strokePath();
    }

    public clearTrajectory() : void{
        this.trajectoryGraphics.clear();
    }
    

    public hoopCollideCallback(ball: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, internalHoop: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        // You can emit an event from the ball or execute any logic here
        

        if (ball instanceof Ball && internalHoop instanceof InternalHoopArcadeImage) {
            // Now you can use 'ball' to emit events
            
            //var touching = !ball.arcadeBody.touching.none;
            //var touching = ball.arcadeBody.overlapR !==0 ;

            //console.log("touching", touching, "touching noun", !ball.arcadeBody.touching.none, "embedded", ball.arcadeBody.embedded, "binding", ball.isBinded(), "overlaping", ball.arcadeBody.overlapR, ball.arcadeBody.overlapR !==0 );
            //console.log(touching, ball.isBinded(), ball.wasBinded());
            
            let basketballHoop = internalHoop.getBasketballHoop();
            if (!ball.isBinded() && !ball.wasBinded()){
                console.log("internal hoop overlapstart");
                
                ball.bindBall(basketballHoop);
                ball.emit("internal hoop overlapstart", basketballHoop);
                
            }

        
            ball.emit('collide with hoop', internalHoop);
            // And 'ball.body' for physics operations, if needed
        }
    }
}

export default Ball;