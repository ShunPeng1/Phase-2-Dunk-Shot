import AssetManager from "../../managers/AssetManager"
import UiImageButton from "../../utilities/ui/UiImageButton"
import UiUtilities from "../../utilities/ui/UiUtilities"

class ChallengeSelectionButton extends UiImageButton {
    private banner: Phaser.GameObjects.Image
    private icon: Phaser.GameObjects.Image
    private particles: Phaser.GameObjects.Particles.ParticleEmitter
    private particleMask: Phaser.Display.Masks.BitmapMask

    private percentageText: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, bannerTextureKey: string, bannerText: string, iconTextureKey: string) {
        super(scene, x, y, AssetManager.MASKS_186_KEY)

        this.banner = scene.add.image(0, 0, bannerTextureKey)
        
        this.add(this.banner)

        // Create the banner
        this.icon = scene.add.image(-120, 0, iconTextureKey)
        this.icon.setScale(1.2)
        this.add(this.icon)

        

        // Create particles
        this.particles = scene.add.particles(x, y, iconTextureKey, {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })


        // Position the particles to emit from the center of the button
        this.particles.startFollow(this)

        // Create a mask for the particles so they only appear within the button
        const maskShape = scene.make.graphics({}).fillRect(x, y, this.width, this.height)
        this.particleMask = maskShape.createBitmapMask()
        this.particles.setMask(this.particleMask)


        // Create the banner text
        const bannerTextStyle = {
            fontSize: '40px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'center'
        }
        const bannerTextObj = scene.add.text(80, 0, bannerText, bannerTextStyle).setOrigin(0.5)

        // Add the banner text to the banner
        this.add(bannerTextObj)

        const rightArrow = scene.add.image(260, 0, AssetManager.MASKS_220_KEY)
        
        this.add(rightArrow)

        
        const percentagePanel = scene.add.image(-250, 0, AssetManager.MASKS_190_KEY)
        percentagePanel.setTint(0x727272)
        this.add(percentagePanel)

        this.percentageText = scene.add.text(-250, 0, '100%', { font: 'bold 40px Arial', color: '#ffffff' }).setOrigin(0.5) 
        this.add(this.percentageText)

        

        UiUtilities.applyButtonScaleTweens(this)
    }

    public setPercentage(percentage: number) {
        percentage = Math.min(100, Math.max(0, percentage))
        percentage = Math.round(percentage)
        this.percentageText.setText(`${percentage}%`)
    }
}

export default ChallengeSelectionButton