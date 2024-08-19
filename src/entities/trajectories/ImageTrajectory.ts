// ImageTrajectory.ts
import Phaser from "phaser"
import ITrajectory from "./ITrajectory"

class ImageTrajectory implements ITrajectory {
    
    protected scene: Phaser.Scene
    protected body: Phaser.Physics.Arcade.Body
    protected maxDistance: number
    protected maxIteration: number
    protected skipping: number
    protected images: Phaser.GameObjects.Image[]
    protected textureKey: string
    protected color = 0xffff00
    protected scale = 1

    constructor(scene: Phaser.Scene, body: Phaser.Physics.Arcade.Body, maxDistance = 1000, maxIteration = 100, skipping = 1, textureKey = "", color = 0xffff00, scale = 1) {
        this.scene = scene
        this.body = body
        this.maxDistance = maxDistance
        this.maxIteration = maxIteration
        this.skipping = skipping
        this.images = []

        this.textureKey = textureKey
        this.color = color
        this.scale = scale
    }

    public draw(startPosition: Phaser.Math.Vector2, force: number, angle: number): void {
        this.clear()
    
        const forceVector = new Phaser.Math.Vector2(force * Math.cos(angle), force * Math.sin(angle))
        const currentPosition = new Phaser.Math.Vector2(startPosition.x, startPosition.y)
        const velocity = new Phaser.Math.Vector2(forceVector.x, forceVector.y)
        const gravity = this.scene.physics.world.gravity
    
        // Predict the trajectory
        for (let i = this.skipping; i < this.maxIteration; i += this.skipping) {
            const time = i / this.scene.physics.world.fps // Convert iteration to seconds
            const dx = startPosition.x + velocity.x * time
            const dy = startPosition.y + velocity.y * time + 0.5 * gravity.y * time * time
    
            currentPosition.set(dx, dy)
            const distanceTraveled = Phaser.Math.Distance.Between(startPosition.x, startPosition.y, currentPosition.x, currentPosition.y)
    
            // End the loop if the distance traveled exceeds the maximum distance
            if (distanceTraveled > this.maxDistance) {
                break
            }
    
            if (i % this.skipping === 0) {
                // Place an image at the current position
                const image = this.scene.add.image(dx, dy, this.textureKey)
                image.setTint(this.color)
                image.setScale(this.scale)
                this.images.push(image)
            }
        }
    }

    

    public clear(): void {
        // Clear all images from the trajectory
        this.images.forEach(image => image.destroy())
        this.images = []
    }
}

export default ImageTrajectory