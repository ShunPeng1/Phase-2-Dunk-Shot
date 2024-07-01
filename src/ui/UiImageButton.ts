import UiImage from "./UiImage";
import IUiClickable from "./types/IUiClickable";
import IUiHoverable from "./types/IUiHoverable";

class UiImageButton extends UiImage implements IUiClickable, IUiHoverable{
    public isClicked: boolean;
    public isHovered: boolean;
    private onActiveCallback?: () => void;
    private onUnactiveCallback?: () => void;
    private onHoverCallback?: () => void;
    private onRestCallback?: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined, onActiveCallback?: () => void, onUnactiveCallback?: () => void, onHoverCallback?: () => void, onRestCallback?: () => void) {
        super(scene, x, y, texture, frame);
        this.isClicked = false;
        this.setInteractive();
        this.on('pointerdown', () => this.enterActiveState());
        this.on('pointerup', () => this.enterUnactiveState());
        this.on('pointerover', () => this.enterHoverState());
        this.on('pointerout', () => this.enterRestState());

        // Store callbacks
        this.onActiveCallback = onActiveCallback;
        this.onUnactiveCallback = onUnactiveCallback;
        this.onHoverCallback = onHoverCallback;
        this.onRestCallback = onRestCallback;
    }

    public enterActiveState(): void {
        if (this.onActiveCallback) {
            this.onActiveCallback();
        }
    }

    public enterUnactiveState(): void {
        if (this.onUnactiveCallback) {
            this.onUnactiveCallback();
        }
    }

    public enterHoverState(): void {
        if (this.onHoverCallback) {
            this.onHoverCallback();
        }
    }

    public enterRestState(): void {
        if (this.onRestCallback) {
            this.onRestCallback();
        }
    }
}