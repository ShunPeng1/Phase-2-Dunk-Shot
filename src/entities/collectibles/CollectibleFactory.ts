import { Scene } from "phaser";
import BasketballHoop from "../hoops/BasketballHoop";
import Collectible from "./Collectible";
import GoldenStarCollectible from "./GoldenStarCollectible";


class CollectibleFactory {
    private scene : Scene;

    constructor(scene : Scene) {
        this.scene = scene;
    }


    public createCollectible(collectibleType: CollectibleType, x : number, y : number, hoop : BasketballHoop) : Collectible {
        
        let collectible : Collectible;
        switch (collectibleType) {
            case GoldenStarCollectible:
                collectible = new GoldenStarCollectible(this.scene, x, y, hoop);
                break;
            default:
                collectible = new GoldenStarCollectible(this.scene, x, y, hoop);
                break;
        }
        
        return collectible;

    }

}


export default CollectibleFactory;