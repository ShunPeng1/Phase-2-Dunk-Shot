import { Scene } from "phaser";
import BasketballHoop from "./BasketballHoop";
import HoopSpawnInfo from "./HoopSpawnInfo";
import HoopSpawnSet from "./HoopSpawnSet";
import Ball from "../balls/Ball";
import HoopFactory from "./HoopFactory";
import Collectible from "../collectibles/Collectible";
import CollectibleFactory from "../collectibles/CollectibleFactory";
import BallInteraction from "../balls/BallInteraction";
import ObstacleFactory from "../boundaries/ObstacleFactory";
import ObstacleBoundaryImage from "../boundaries/ObstacleBoundaryImage";

class HoopSpawner {
    
    private scene : Scene;
    private ball : Ball;


    private hoopSpawnSet: HoopSpawnSet;
    private leftBound: number;
    private rightBound: number;
    private middleBound: number;

    private hoopFactory: HoopFactory;
    private collectibleFactory: CollectibleFactory;
    private obstacleFactory: ObstacleFactory;


    
    constructor(scene : Scene, ball : Ball, hoopSpawnSet: HoopSpawnSet, hoopFactory : HoopFactory, collectibleFactory : CollectibleFactory, obstacleFactory : ObstacleFactory, leftBound: number, rightBound: number) {
        this.scene = scene;
        this.ball = ball;

        this.hoopSpawnSet = hoopSpawnSet;
        this.hoopFactory = hoopFactory;
        this.collectibleFactory = collectibleFactory;
        this.obstacleFactory = obstacleFactory;

        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.middleBound = (leftBound + rightBound) / 2;

        
    }

    public spawnRandomHoop(currentPosition : Phaser.Math.Vector2 ): BasketballHoop {
        
        let hoopSpawnInfo = this.hoopSpawnSet.getRandomHoopSpawnInfo();

        let x, y, rotation;
    
        // Check the spawn type
        if (hoopSpawnInfo.spawnType === "RANDOM") {
            // Calculate random position within the specified offsets
            x = Math.random() * (this.rightBound - this.leftBound) + this.leftBound;
            y = hoopSpawnInfo.minOffset.y + Math.random() * (hoopSpawnInfo.maxOffset.y - hoopSpawnInfo.minOffset.y);
        
            rotation = hoopSpawnInfo.rotationVariance.x + Math.random() * (hoopSpawnInfo.rotationVariance.y - hoopSpawnInfo.rotationVariance.x);

            while( Math.abs(x - currentPosition.x) < hoopSpawnInfo.minOffset.x || Math.abs(x - currentPosition.x) > hoopSpawnInfo.maxOffset.x){
                x = Math.random() * (this.rightBound - this.leftBound) + this.leftBound;
            
            }
            
            if (currentPosition.x < x) { // Spawn to the right
                rotation = Math.random() * (hoopSpawnInfo.rotationVariance.x);

            }
            else { // Spawn to the left
                rotation = Math.random() * (hoopSpawnInfo.rotationVariance.y);
            }

            // Adjust x to loop within left and right bounds relative to the current position
            

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
        
        hoop.enableOverlap(this.ball, this.ball.internalHoopOverlapCallback);
        hoop.enableCollision(this.ball, this.ball.hoopCollisionCallback);

        return hoop;
    }

    public spawnRandomCollectible(hoop: BasketballHoop): Collectible | null {
        let collectibleSpawnInfo = this.hoopSpawnSet.getRandomCollectibleSpawnInfo();

        if (collectibleSpawnInfo) {
            let worldPosition = hoop.getInternalHoopWorldPosition();

            let x = worldPosition.x;
            let y = worldPosition.y;

            let hoopRotation = hoop.getRotation();
            x -= collectibleSpawnInfo.yOffset * Math.sin(hoopRotation);
            y += collectibleSpawnInfo.yOffset * Math.cos(hoopRotation);

    
            // Spawn the collectible at the calculated position
            const collectible = this.collectibleFactory.createCollectible(collectibleSpawnInfo.collectibleType, x, y, hoop);
            collectible.setScale(collectibleSpawnInfo.scale);
            
            collectible.enableOverlap(this.ball, this.ball.collectibleOverlapCallback);


            this.scene.add.existing(collectible);

            return collectible;
        }

        return null;
    }

    public spawnNextHoop(currentHoop : BasketballHoop) : BasketballHoop{
        let matrix = currentHoop.getWorldTransformMatrix();
        let worldPosition = new Phaser.Math.Vector2();
        
        // Apply the matrix transformation to the local point to get the world position
        worldPosition.x = matrix.tx;
        worldPosition.y = matrix.ty;

        // Spawn the next hoop at the world position of the current hoop
        let nextHoop = this.spawnRandomHoop(worldPosition);
        this.spawnRandomCollectible(nextHoop);

        let nextHoopWorldPosition = nextHoop.getWorldTransformMatrix(); 
    
        let obstacle = this.spawnRandomObstacle(currentHoop, nextHoop, worldPosition.x < nextHoopWorldPosition.tx);

        return nextHoop;
    }

    public spawnRandomObstacle(lastHoop: BasketballHoop, currentHoop : BasketballHoop, isFacingLeft: boolean): ObstacleBoundaryImage | null{

        let obstacleSpawnInfo = this.hoopSpawnSet.getRandomObstacleSpawnInfo();

        if (obstacleSpawnInfo) {
            let worldPosition = currentHoop.getInternalHoopWorldPosition();

            let x = worldPosition.x;
            let y = worldPosition.y;
            let rotation = 0;
            

            switch (obstacleSpawnInfo.spawnPositionAndRotation) {
                case "NEXTTO VERTICAL":
                    x = x + (isFacingLeft ? 60 : -60);
                    y = y - 60;
                    break;

                case "SIDE HORIZONTAL":
    
                    x = x + (isFacingLeft ? -130 : 130);
                    rotation = Math.PI / 2;
                    
                    break;

                case "TOP HORIZONTAL":
                    y = y - 140;
                    rotation = Math.PI / 2;
                    break;
                
                case "TOP VERTICAL":
                    y = y - 170;
                    
                    break;

                case "SIDE VERTICAL":
                    x = x + (isFacingLeft ? -200 : 200);
                    y = y - 60;
                    break;

            }


            console.log(obstacleSpawnInfo.spawnPositionAndRotation, isFacingLeft, x, y, rotation)


            let obstacle = this.obstacleFactory.createObstacle(obstacleSpawnInfo.obstacleType, x, y);
            obstacle.setRotation(rotation);
            obstacle.setScale(0.5);            
            obstacle.enableCollision(this.ball, this.ball.wallCollisionCallback);

            this.scene.add.existing(obstacle);

            lastHoop.addObstacle(obstacle);

            return obstacle;
        }
        
        return null;
        
    }


    
    
}

export default HoopSpawner;