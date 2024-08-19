// Trajectory.ts
import Phaser from "phaser"
import ITrajectory from "./ITrajectory"

class LineTrajectory implements ITrajectory {
    
    private graphics: Phaser.GameObjects.Graphics
    private scene: Phaser.Scene
    private body: Phaser.Physics.Arcade.Body
    private maxDistance: number
    private maxIteration: number
    private skipping: number

    constructor(scene: Phaser.Scene, body: Phaser.Physics.Arcade.Body, maxDistance = 1000, maxIteration = 100, skipping = 1) {
        this.scene = scene
        this.body = body
        this.maxDistance = maxDistance
        this.maxIteration = maxIteration
        this.skipping = skipping
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xffff00 } })
    }

    public draw(startPosition: Phaser.Math.Vector2, force: number, angle: number): void {
        this.clear()
    
        // Clear the previous trajectory line
        this.graphics.clear()
        const forceVector = new Phaser.Math.Vector2(force * Math.cos(angle), force * Math.sin(angle))
        // Start drawing the trajectory
        this.graphics.lineStyle(2, 0xffff00, 1)
    
        
        const currentPosition = new Phaser.Math.Vector2(startPosition.x, startPosition.y)
        const velocity = new Phaser.Math.Vector2(forceVector.x, forceVector.y)
        const gravity = this.scene.physics.world.gravity
    
        // Predict the trajectory

        for (let i = 0; i < this.maxIteration; i += this.skipping) {
            const time = i / this.scene.physics.world.fps // Convert iteration to seconds
            const dx = startPosition.x + velocity.x * time
            const dy = startPosition.y + velocity.y * time + 0.5 * gravity.y * time * time
    
            currentPosition.set(dx, dy)
            const distanceTraveled = Phaser.Math.Distance.Between(startPosition.x, startPosition.y, currentPosition.x, currentPosition.y)
    
            

            // End the loop if the distance traveled exceeds the maximum distance
            if (distanceTraveled > this.maxDistance) {
                break
            }
    
            if (i === 0) {
                this.graphics.beginPath()
                this.graphics.moveTo(dx, dy)
            } else {
                this.graphics.lineTo(dx, dy)
            }

        }
    
        this.graphics.strokePath()
    }

    public clear(): void {
        this.graphics.clear()
    }
}

export default LineTrajectory