import AssetManager from "../../managers/AssetManager"

class FireTrail extends Phaser.GameObjects.GameObject {
    private fireEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    private smokeEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    private follow: Phaser.GameObjects.Components.Transform
    constructor(scene: Phaser.Scene, x: number, y: number, follow: Phaser.GameObjects.Components.Transform) {
        super(scene, "fireTrail")

        // Set the follow object
        this.follow = follow

        // Fire emitter configuration
        this.fireEmitter = new Phaser.GameObjects.Particles.ParticleEmitter(scene, x, y, AssetManager.MASKS_FIRE_KEY, {
            color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
            colorEase: 'quad.out',
            lifespan: 700,
            angle: { min: -100, max: -80 },
            rotate: { min: 0, max: 360 }, // Spinning effect
            scale: { start: 0.22, end: 0, ease: 'sine.out' },
            //speed: 100,
            follow: follow,
            frequency: 50,
            
            
            //blendMode: 'ADD'
        })
        this.fireEmitter.setDepth(-1)

        // Smoke emitter configuration
        this.smokeEmitter = new Phaser.GameObjects.Particles.ParticleEmitter(scene, x, y, AssetManager.MASKS_BIG_SMOKE_KEY, {
            color: [0x555555],
            lifespan: 1000,
            x: { min: -5, max: 5 },
            y: { min: -5, max: 5 },
            angle: { min: -110, max: -70 },
            scale: { start: 0.15, end: 0, ease: 'Back.in' },
            alpha: { start: 0.5, end: 0 },
            speed: 140,
            quantity: 1,
            follow: follow,

            frequency: 70,
            //blendMode: 'MULTIPLY'
        })

        this.fireEmitter.setDepth(-0.8)
        this.smokeEmitter.setDepth(-0.9)

        this.scene.add.existing(this.fireEmitter)
        this.scene.add.existing(this.smokeEmitter)

        this.stop()
        
    }

    public start() {
        this.fireEmitter.start()
        this.smokeEmitter.start()

        
    }

    public stop() {
        this.fireEmitter.stop()
        this.smokeEmitter.stop()
    }

    
}

export default FireTrail