import Phaser from 'phaser';
import CustomCollider from './CustomCollider';

class LineCollider extends CustomCollider {
    private from: number;
    private to: number;
    private func: (x: number) => number;
    private numColliders: number;
    private colliderSize: number;
    private visual: ColliderVisual;
    

    constructor(scene: Phaser.Scene, x: number, y: number, from: number, to: number, func: (x: number) => number, numColliders: number, colliderSize: number, visual: ColliderVisual) {
        super(scene,x,y);

        this.from = from;
        this.to = to;
        this.func = func;
        this.numColliders = numColliders;
        this.colliderSize = colliderSize;
        this.visual = visual;

        this.initColliders();
    }

    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        const step = (this.to - this.from) / (this.numColliders - 1);

        const colliderChildren: Phaser.GameObjects.GameObject[] = [];

        for (let i = 0; i < this.numColliders; i++) {
            const x = this.from + i * step;
            const y = this.func(x);
            

            let collider: Phaser.GameObjects.GameObject;

            if (this.visual.type === 'image' || this.visual.type === 'sprite') {
                collider = this.scene.physics.add[this.visual.type](
                    x, y, this.visual.key
                )
                .setCircle(this.colliderSize / 2)
                .setDisplaySize(this.colliderSize, this.colliderSize);
            } else {
                collider = this.scene.physics.add.image(x, y, '')
                    .setVisible(false)
                    .setCircle(this.colliderSize / 2)
                    .setDisplaySize(this.colliderSize, this.colliderSize);
            }

            colliderChildren.push(collider);

        }

        return colliderChildren;
    }

}

export default LineCollider;