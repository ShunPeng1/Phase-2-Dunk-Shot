import AssetManager from "../../managers/AssetManager";

class SmokeTrail extends Phaser.GameObjects.GameObject {
    private smokeEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private follow: Phaser.GameObjects.Components.Transform;

    constructor(scene: Phaser.Scene, x: number, y: number, follow: Phaser.GameObjects.Components.Transform) {
        super(scene, "smokeTrail");

        // Set the follow object
        this.follow = follow;

        // Smoke emitter configuration for white to grey smoke
        // Smoke emitter configuration
        this.smokeEmitter = new Phaser.GameObjects.Particles.ParticleEmitter(scene, x, y,  AssetManager.MASKS_BIG_SMOKE_KEY,{
            color: [0xffffff, 0x555555],
            lifespan: 1000,
            x: { min: -5, max: 5 },
            y: { min: -5, max: 5 },
            angle: { min: -110, max: -70 },
            scale: { start: 0.15, end: 0, ease: 'Back.in' },
            alpha: { start: 0.5, end: 0 },
            speed: 140,
            follow: follow,
            frequency: 70,
            //blendMode: 'MULTIPLY'
        });

        this.smokeEmitter.setDepth(-0.9);

        this.scene.add.existing(this.smokeEmitter);

        this.stop();
    }

    public start() {
        this.smokeEmitter.start();
    }

    public stop() {
        this.smokeEmitter.stop();
    }
}

export default SmokeTrail;