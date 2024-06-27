import HoopSpawnInfo from "./HoopSpawnInfo";

class HoopSpawnSet{
    private hoopSpawnInfos : HoopSpawnInfo[];

    private totalHoopSpawnChance : number;

    constructor(hoopSpawnInfos : HoopSpawnInfo[]){
        this.hoopSpawnInfos = hoopSpawnInfos;

        hoopSpawnInfos.forEach(hoopSpawnInfo => {
            this.totalHoopSpawnChance += hoopSpawnInfo.spawnChance;
        })

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


}

export default HoopSpawnSet;