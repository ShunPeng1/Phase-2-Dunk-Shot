import { Scene } from "phaser";
import AssetManager from "../AssetManager";
import BasketballHoop from "../entities/BasketballHoop";

class PlayScene extends Scene {

    constructor() {
        super({ key: AssetManager.PLAY_SCENE });
    }

    preload() {
        this.load.image(AssetManager.INNER_RING_BASKET_KEY, AssetManager.INNER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.OUTER_RING_BASKET_KEY, AssetManager.OUTER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.NET_BASKET_KEY, AssetManager.NET_BASKET_IMAGE);
        
    }

    create() {
        // Set the background color to white
        //this.cameras.main.setBackgroundColor('#FFFFFF');
    
        let hoop = new BasketballHoop(this, 100, 100);

        hoop.setRingTint(0xea4214);

        hoop.setNetScale(3);
    
    }

    



}



export default PlayScene;