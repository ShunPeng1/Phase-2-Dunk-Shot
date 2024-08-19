import ObstacleSpawnInfo from "../boundaries/ObstacleSpawnInfo"
import CollectibleSpawnInfo from "../collectibles/CollectibleSpawnInfo"
import HoopSpawnInfo from "./HoopSpawnInfo"

class HoopSpawnSet{
    private hoopSpawnInfos : HoopSpawnInfo[]
    private collectibleSpawnInfos : CollectibleSpawnInfo[]
    private obstacleSpawnInfos : ObstacleSpawnInfo[]

    private totalHoopSpawnChance = 0
    private totalCollectibleSpawnChance = 0
    private totalObstacleSpawnChance = 0

    private collectibleSpawnChance : number
    private obstacleSpawnChance : number


    constructor(hoopSpawnInfos : HoopSpawnInfo[], collectibleSpawnInfos : CollectibleSpawnInfo[], obstacleSpawnInfos : ObstacleSpawnInfo[], collectibleSpawnChance : number, obstacleSpawnChance : number){
        this.hoopSpawnInfos = hoopSpawnInfos

        hoopSpawnInfos.forEach(hoopSpawnInfo => {
            this.totalHoopSpawnChance += hoopSpawnInfo.spawnChance
        })

        this.collectibleSpawnInfos = collectibleSpawnInfos

        collectibleSpawnInfos.forEach(collectibleSpawnInfo => {
            this.totalCollectibleSpawnChance += collectibleSpawnInfo.spawnChance
        })

        this.collectibleSpawnChance = collectibleSpawnChance

        this.obstacleSpawnInfos = obstacleSpawnInfos

        obstacleSpawnInfos.forEach(obstacleSpawnInfo => {
            this.totalObstacleSpawnChance += obstacleSpawnInfo.spawnChance
        })

        this.obstacleSpawnChance = obstacleSpawnChance

    }


    public getRandomHoopSpawnInfo() : HoopSpawnInfo{
        const random = Math.random() * this.totalHoopSpawnChance

        let currentChance = 0

        for (let i = 0; i < this.hoopSpawnInfos.length; i++){
            currentChance += this.hoopSpawnInfos[i].spawnChance
            if (random <= currentChance){
                return this.hoopSpawnInfos[i]
            }
        }

        return this.hoopSpawnInfos[0]
    }

    public getRandomCollectibleSpawnInfo() : CollectibleSpawnInfo | null{

        if (Math.random() > this.collectibleSpawnChance){
            return null
        }

        const random = Math.random() * this.totalCollectibleSpawnChance

        let currentChance = 0

        for (let i = 0; i < this.collectibleSpawnInfos.length; i++){
            currentChance += this.collectibleSpawnInfos[i].spawnChance
            if (random <= currentChance){
                return this.collectibleSpawnInfos[i]
            }
        }

        return this.collectibleSpawnInfos[0]
    }

    public getRandomObstacleSpawnInfo() : ObstacleSpawnInfo | null{
            
            if (Math.random() > this.obstacleSpawnChance){
                return null
            }
    
            const random = Math.random() * this.totalObstacleSpawnChance
    
            let currentChance = 0
    
            for (let i = 0; i < this.obstacleSpawnInfos.length; i++){
                currentChance += this.obstacleSpawnInfos[i].spawnChance
                if (random <= currentChance){
                    return this.obstacleSpawnInfos[i]
                }
            }
    
            return this.obstacleSpawnInfos[0]
    }

}

export default HoopSpawnSet