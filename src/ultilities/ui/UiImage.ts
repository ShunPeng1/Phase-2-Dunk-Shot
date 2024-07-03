import { Scene } from "phaser";

import IUi from "./types/IUi";

class UiImage extends Phaser.GameObjects.Image implements IUi {
    public ratio: number;

    constructor(scene: Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);


        this.setScrollFactor(0,0);

    }

    
}



export default UiImage;