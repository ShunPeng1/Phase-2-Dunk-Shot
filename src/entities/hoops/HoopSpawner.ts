import { Scene } from "phaser";
import BasketballHoop from "./BasketballHoop";
import HoopSpawnInfo from "./HoopSpawnInfo";
import HoopSpawnSet from "./HoopSpawnSet";
import Ball from "../Ball";
import HoopFactory from "./HoopFactory";
import Collectible from "../collectibles/Collectible";
import CollectibleFactory from "../collectibles/CollectibleFactory";

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
    
    private enterNextHoopSubscribers: ((hoop: BasketballHoop) => void)[] = [];
    private enterCurrentHoopSubcribers: ((hoop: BasketballHoop) => void)[] = [];

    private isFirstHoopExist: boolean = false;
    private collectibleFactory: CollectibleFactory;


    constructor(scene : Scene, ball : Ball, hoopSpawnSet: HoopSpawnSet, hoopFactory : HoopFactory, collectibleFactory : CollectibleFactory, leftBound: number, rightBound: number) {
        this.scene = scene;
        this.ball = ball;
        this.hoopSpawnSet = hoopSpawnSet;
        this.hoopFactory = hoopFactory;
        this.collectibleFactory = collectibleFactory;

        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.middleBound = (leftBound + rightBound) / 2;


        this.ball.on("internal hoop overlapstart", this.checkEnterNextHoop, this)
    }

    private checkEnterNextHoop(enterHoop : BasketballHoop) : void {
        if (this.nextHoop === enterHoop) {
            this.enterNextHoopSubscribers.forEach(subscriber => subscriber(enterHoop));
            
            this.spawnNextHoop();
            
        }
        else{
            this.enterCurrentHoopSubcribers.forEach(subscriber => subscriber(enterHoop));
        
        }
    }
    
    public subscribeToEnterNextHoop(subscriber: (hoop: BasketballHoop) => void): void {
        this.enterNextHoopSubscribers.push(subscriber);
    }

    public unsubscribeFromEnterNextHoop(subscriber: (hoop: BasketballHoop) => void): void {
        this.enterNextHoopSubscribers = this.enterNextHoopSubscribers.filter(sub => sub !== subscriber);
    }

    public subscribeToEnterCurrentHoop(subscriber: (hoop: BasketballHoop) => void): void {
        this.enterCurrentHoopSubcribers.push(subscriber);
    }

    public unsubscribeFromEnterCurrentHoop(subscriber: (hoop: BasketballHoop) => void): void {
        this.enterCurrentHoopSubcribers = this.enterCurrentHoopSubcribers.filter(sub => sub !== subscriber);
    }

    public spawnHoop(currentPosition : Phaser.Math.Vector2 ): BasketballHoop {
        
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

    public spawnCollectible(hoop: BasketballHoop): Collectible | null {
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

    public setCurrentHoop(hoop: BasketballHoop): void {
        this.currentHoop = hoop;
    }   

    public setNextHoop(hoop: BasketballHoop): void {
        this.nextHoop = hoop;
    }

    public setFirstHoop(hoop: BasketballHoop, ): void {
        this.currentHoop = hoop;
        this.isFirstHoopExist = true;
    }

    public spawnNextHoop() : BasketballHoop{
        
        if (this.currentHoop) {
            this.currentHoop.destroy();
            this.isFirstHoopExist = false;
        }
    
        this.currentHoop = this.nextHoop;
        
        let matrix = this.nextHoop!.getWorldTransformMatrix();
        let worldPosition = new Phaser.Math.Vector2();
        
        // Apply the matrix transformation to the local point to get the world position
        worldPosition.x = matrix.tx;
        worldPosition.y = matrix.ty;

        // Spawn the next hoop at the world position of the current hoop
        this.nextHoop = this.spawnHoop(worldPosition);
        this.spawnCollectible(this.nextHoop);

        return this.nextHoop;
    }

    public getFirstHoopExist() : boolean {
        return this.isFirstHoopExist;
    }

    public getFirstHoop() : BasketballHoop | null {
        if (this.isFirstHoopExist) {
            return this.currentHoop;
        }
        return null;
    }
}

export default HoopSpawner;