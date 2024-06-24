import { Scene } from "phaser";
import AssetManager from "../AssetManager";

class PlayScene extends Scene {

    constructor() {
        super({ key: AssetManager.PLAY_SCENE });
    }

    preload() {
        // Load assets here
    }

    create() {
        // Set the background color to white
        this.cameras.main.setBackgroundColor('#FFFFFF');
    }

    



}



export default PlayScene;