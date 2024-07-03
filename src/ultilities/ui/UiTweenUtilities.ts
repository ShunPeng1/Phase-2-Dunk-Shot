import UiImageButton from "./UiImageButton";

class UiTweenUtilities {

    static applyButtonTweens(button: UiImageButton, scaleDownFactor: number = 0.95, duration: number = 100): void {
        // Scale down on pointer down


        button.addOnPressDownCallback(() => {

            const currentScaleX = button.container.scaleX;
            const currentScaleY = button.container.scaleY;

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
            
            const currentScaleX = button.container.scaleX;
            const currentScaleY = button.container.scaleY;

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


export default UiTweenUtilities;