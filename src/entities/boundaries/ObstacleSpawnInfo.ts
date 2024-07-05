class ObstacleSpawnInfo {
    public readonly obstacleType: ObstacleType;
    public readonly spawnChance: number;
    
    public readonly spawnPositionAndRotation: ObstacleSpawnPositionAndRotation;

    constructor(obstacleType: ObstacleType, spawnChance: number, spawnPositionAndRotation: ObstacleSpawnPositionAndRotation) {
        this.obstacleType = obstacleType;
        this.spawnChance = spawnChance;
        this.spawnPositionAndRotation = spawnPositionAndRotation
    }

    
}




export default ObstacleSpawnInfo;