
class CollectibleSpawnInfo {
    public readonly collectibleType: CollectibleType
    public readonly spawnChance: number

    
    public readonly yOffset: number
    public readonly scale: number = 1

    constructor(collectibleType: CollectibleType, spawnChance: number, yOffset: number, scale = 1) {
        this.collectibleType = collectibleType
        this.spawnChance = spawnChance
        this.yOffset = yOffset
        this.scale = scale
    }


}

export default CollectibleSpawnInfo