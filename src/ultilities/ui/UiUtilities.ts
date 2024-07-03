import UiImageButton from "./UiImageButton";

class UiUtilities {

    static applyButtonScaleTweens(button: UiImageButton, scaleDownFactor: number = 0.95, duration: number = 100): void {
        // Scale down on pointer down

        let isScaled = false;
        button.addOnPressDownCallback(() => {

            const currentScaleX = button.container.scaleX;
            const currentScaleY = button.container.scaleY;
            isScaled = true;

            button.scene.tweens.add({
                targets: button.container,
                scaleX: currentScaleX * scaleDownFactor,
                scaleY: currentScaleY * scaleDownFactor,
                duration: duration,
                ease: 'Linear'
            });
        });

        // Return to normal scale on pointer up or hover out
        const returnToNormalScale = () => {
            if (!isScaled) return;

            const currentScaleX = button.container.scaleX;
            const currentScaleY = button.container.scaleY;
            isScaled = false;

            button.scene.tweens.add({
                targets: button.container,
                scaleX: currentScaleX / scaleDownFactor,
                scaleY: currentScaleY / scaleDownFactor,
                duration: duration,
                ease: 'Linear'
            });
        };

        

        button.addOnPressUpCallback(returnToNormalScale);
        button.addOnRestCallback(returnToNormalScale);
    
    }
}


export default UiUtilities;