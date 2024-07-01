import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager";

class MainMenuUIScene extends Scene {
    constructor() {
        super({ key: AssetManager.MAIN_MENU_UI_SCENE });
    }


    create() {
        
        let title = this.add.image(AssetManager.WORLD_WIDTH/2 - 50, 190, AssetManager.MAIN_MENU_TITLE_KEY);
        title.setScale(0.4);

        let mobileTile = this.add.image(AssetManager.WORLD_WIDTH/2 + 170, 190, AssetManager.MOBILE_TITLE_KEY).setOrigin(0.5, 0);
        mobileTile.setScale(0.4);
    }
}

export default MainMenuUIScene;