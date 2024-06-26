class Ball extends Phaser.Physics.Arcade.Sprite {

    protected arcadeBody: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(this.width /2 );
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setDepth(1);


        this.arcadeBody = this.body as Phaser.Physics.Arcade.Body;

    }

    update() {
    }

    public bindBall() : void{    
        this.setVelocity(0,0);
        this.setImmovable(true);
        this.arcadeBody.setAllowGravity(false);
    }

    public pushBall(force : number, angle : number) : void{
        this.setImmovable(false);
        this.arcadeBody.setAllowGravity(true);
        

        this.setVelocity(force * Math.cos(angle), force * Math.sin(angle));
    }
}

export default Ball;