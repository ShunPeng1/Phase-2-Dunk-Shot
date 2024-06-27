import { Scene } from "phaser";
import BasketballHoop from "./BasketballHoop";
import HoopSpawnInfo from "./HoopSpawnInfo";
import HoopSpawnSet from "./HoopSpawnSet";
import Ball from "../Ball";
import HoopFactory from "./HoopFactory";

class HoopSpawner {
    private scene : Scene;
    private ball : Ball;
    private hoopSpawnSet: HoopSpawnSet;
    private leftBound: number;
    private rightBound: number;
    private middleBound: number;

    private hoopFactory: HoopFactory;

    private currentHoop: BasketballHoop | null = null;
    private nextHoop: BasketballHoop | null = null;


    constructor(scene : Scene, ball : Ball, hoopSpawnSet: HoopSpawnSet, hoopFactory : HoopFactory, leftBound: number, rightBound: number) {
        this.scene = scene;
        this.ball = ball;
        this.hoopSpawnSet = hoopSpawnSet;
        this.hoopFactory = hoopFactory;

        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.middleBound = (leftBound + rightBound) / 2;
    }


    public spawnHoop(currentPosition : Phaser.Math.Vector2 ): BasketballHoop {
        
        let hoopSpawnInfo = this.hoopSpawnSet.getRandomHoopSpawnInfo();

        let x, y, rotation;
    
        // Check the spawn type
        if (hoopSpawnInfo.spawnType === "RANDOM") {
            // Calculate random position within the specified offsets
            x = hoopSpawnInfo.minOffset.x + Math.random() * (hoopSpawnInfo.maxOffset.x - hoopSpawnInfo.minOffset.x);
            y = hoopSpawnInfo.minOffset.y + Math.random() * (hoopSpawnInfo.maxOffset.y - hoopSpawnInfo.minOffset.y);
        
            rotation = hoopSpawnInfo.rotationVariance.x + Math.random() * (hoopSpawnInfo.rotationVariance.y - hoopSpawnInfo.rotationVariance.x);


            if (currentPosition.x < this.middleBound) {
                x += this.middleBound;
            }
            else {
                x -= this.middleBound;
            }

            x += currentPosition.x;
            y += currentPosition.y;
            
        } else {
            // Select a random fixed position
            const randomIndex = Math.floor(Math.random() * hoopSpawnInfo.fixedSpawnPositions.length);
            const position = hoopSpawnInfo.fixedSpawnPositions[randomIndex];

            x = position.x;
            y = position.y;
            rotation = hoopSpawnInfo.fixedSpawnRotations[randomIndex];

            // Adjust the position based on the current ball position
            y += currentPosition.y;
        }
        
        // Spawn the hoop at the calculated position
        const hoop = this.hoopFactory.createHoop(hoopSpawnInfo.hoopType, x, y);


        this.scene.add.existing(hoop);

        hoop.setRotation(rotation);
        
        hoop.enableOverlap(this.ball, this.ball.hoopCollideCallback);
        hoop.enableCollision(this.ball);

        return hoop;
    }

    public setCurrentHoop(hoop: BasketballHoop): void {
        this.currentHoop = hoop;
    }   

    public setNextHoop(hoop: BasketballHoop): void {
        this.nextHoop = hoop;
    }

    public spawnNextHoop() : BasketballHoop{
        var worldPosition = new Phaser.Math.Vector2(this.middleBound, 0);
        if (this.currentHoop) {
            // Get the world transformation matrix
            let matrix = this.currentHoop.getWorldTransformMatrix();
            worldPosition = new Phaser.Math.Vector2();
            
            // Apply the matrix transformation to the local point to get the world position
            worldPosition.x = matrix.tx;
            worldPosition.y = matrix.ty;
                
        
            // Destroy the current hoop and update references
            this.currentHoop.destroy();
        }
    
        // Spawn the next hoop at the world position of the current hoop
        this.nextHoop = this.spawnHoop(worldPosition);

        this.currentHoop = this.nextHoop;
        return this.nextHoop;
    }
}

export default HoopSpawner;