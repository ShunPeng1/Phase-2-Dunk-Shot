import { Scene } from "phaser";
import BasketballHoop from "./BasketballHoop";



class HoopSpawnInfo {
    public readonly hoopType: HoopType;
    public readonly spawnChance: number;
    public readonly spawnType: SpawnType;

    public readonly scale: number;

    // Random spawn positions
    public readonly minOffset: Phaser.Math.Vector2;
    public readonly maxOffset: Phaser.Math.Vector2;
    public readonly rotationVariance: Phaser.Math.Vector2;

    // Fixed spawn positions
    public readonly fixedSpawnPositions: Phaser.Math.Vector2[];
    public readonly fixedSpawnRotations: number[];

    private constructor(
        hoopType: HoopType,
        spawnChance: number,
        spawnType: SpawnType,
        minOffset: Phaser.Math.Vector2,
        maxOffset: Phaser.Math.Vector2,
        rotationVariance:  Phaser.Math.Vector2,
        fixedSpawnPositions: Phaser.Math.Vector2[],
        fixedSpawnRotations: number[]
    ) {
        this.hoopType = hoopType;
        this.spawnChance = spawnChance;
        this.spawnType = spawnType;
        this.minOffset = minOffset;
        this.maxOffset = maxOffset;
        this.rotationVariance = rotationVariance;
        this.fixedSpawnPositions = fixedSpawnPositions;
        this.fixedSpawnRotations = fixedSpawnRotations;
    }

    // Inner class
    public static Builder = class {
        private hoopType: HoopType;
        private spawnChance: number = 1;
        private spawnType: SpawnType = "RANDOM";

        // Random spawn positions
        private minOffset: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0,0);
        private maxOffset: Phaser.Math.Vector2 = new Phaser.Math.Vector2(100,100);
        private rotationVariance: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0,0);
        
        // Fixed spawn positions
        private fixedSpawnPositions: Phaser.Math.Vector2[] = [];
        private fixedSpawnRotations: number[] = [];

        constructor(hoopType: HoopType) {
            this.hoopType = hoopType;
        }

        public setSpawnChance(spawnChance: number): this {
            this.spawnChance = spawnChance;
            return this;
        }

        public setSpawnType(spawnType: SpawnType): this {
            this.spawnType = spawnType;
            return this;
        }

        public setMinOffset(minOffset: Phaser.Math.Vector2): this {
            this.minOffset = minOffset;
            return this;
        }

        public setMaxOffset(maxOffset: Phaser.Math.Vector2): this {
            this.maxOffset = maxOffset;
            return this;
        }

        public setRotationVariance(rotationVariance: Phaser.Math.Vector2): this {
            this.rotationVariance = rotationVariance;
            return this;
        }

        public setFixedSpawnPositionsAndRotations(fixedSpawnPositions: Phaser.Math.Vector2[], fixedSpawnRotations : number[] ): this {
            if (fixedSpawnPositions.length === 0) {
                throw new Error("Fixed spawn positions must contain at least one position");
            }

            if (fixedSpawnRotations.length === 0) {
                throw new Error("Fixed spawn rotations must contain at least one rotation");
            }

            if (fixedSpawnPositions.length !== fixedSpawnRotations.length) {
                throw new Error("Fixed spawn positions and rotations must have the same length");
            }

            if (fixedSpawnPositions.some(position => !position)) {
                throw new Error("Fixed spawn positions cannot contain null or undefined values");
            }

            if (fixedSpawnRotations.some(rotation => !rotation)) {
                throw new Error("Fixed spawn rotations cannot contain null or undefined values");
            }


            
            this.fixedSpawnPositions = fixedSpawnPositions;
            this.fixedSpawnRotations = fixedSpawnRotations;
            return this;
        }

        public build(): HoopSpawnInfo {
            return new HoopSpawnInfo(
                this.hoopType,
                this.spawnChance,
                this.spawnType,
                this.minOffset,
                this.maxOffset,
                this.rotationVariance,
                this.fixedSpawnPositions,
                this.fixedSpawnRotations
            );
        }
    };
}

export default HoopSpawnInfo;