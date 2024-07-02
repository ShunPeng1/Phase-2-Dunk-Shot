import CollectibleSpawnInfo from "../collectibles/CollectibleSpawnInfo";
import HoopSpawnInfo from "./HoopSpawnInfo";

class HoopSpawnSet{
    private hoopSpawnInfos : HoopSpawnInfo[];
    private collectibleSpawnInfos : CollectibleSpawnInfo[];

    private totalHoopSpawnChance : number;

    private totalCollectibleSpawnChance : number;

    private collectibleSpawnChance : number;


    constructor(hoopSpawnInfos : HoopSpawnInfo[], collectibleSpawnInfos : CollectibleSpawnInfo[], collectibleSpawnChance : number){
        this.hoopSpawnInfos = hoopSpawnInfos;

        hoopSpawnInfos.forEach(hoopSpawnInfo => {
            this.totalHoopSpawnChance += hoopSpawnInfo.spawnChance;
        })

        this.collectibleSpawnInfos = collectibleSpawnInfos;

        collectibleSpawnInfos.forEach(collectibleSpawnInfo => {
            this.totalCollectibleSpawnChance += collectibleSpawnInfo.spawnChance;
        })

        this.collectibleSpawnChance = collectibleSpawnChance;

    }


    public getRandomHoopSpawnInfo() : HoopSpawnInfo{
        let random = Math.random() * this.totalHoopSpawnChance;

        let currentChance = 0;

        for(let i = 0; i < this.hoopSpawnInfos.length; i++){
            currentChance += this.hoopSpawnInfos[i].spawnChance;
            if(random <= currentChance){
                return this.hoopSpawnInfos[i];
            }
        }

        return this.hoopSpawnInfos[0];
    }

    public getRandomCollectibleSpawnInfo() : CollectibleSpawnInfo | null{

        if (Math.random() > this.collectibleSpawnChance){
            return null;
        }

        let random = Math.random() * this.totalCollectibleSpawnChance;

        let currentChance = 0;

        for(let i = 0; i < this.collectibleSpawnInfos.length; i++){
            currentChance += this.collectibleSpawnInfos[i].spawnChance;
            if(random <= currentChance){
                return this.collectibleSpawnInfos[i];
            }
        }

        return this.collectibleSpawnInfos[0];
    }

    

}

export default HoopSpawnSet;