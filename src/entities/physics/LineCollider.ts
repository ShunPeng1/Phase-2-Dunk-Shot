import Phaser from 'phaser';
import CustomCollider from './CustomCollider';


class LineCollider extends CustomCollider  {
    private from: number;
    private to: number;
    private func: (x: number) => number;
    private numColliders: number;
    private colliderSize: number;
    private visual: ColliderVisual;
    private centroid: Phaser.Geom.Point;

    constructor(scene: Phaser.Scene, from: number, to: number, func: (x: number) => number, numColliders: number, colliderSize: number, visual: ColliderVisual) {
        super(scene);

        this.from = from;
        this.to = to;
        this.func = func;
        this.numColliders = numColliders;
        this.colliderSize = colliderSize;
        this.visual = visual;

        this.createColliders();

        // Calculate the centroid for transformations
        this.centroid = new Phaser.Geom.Point((from + to) / 2, this.func((from + to) / 2));
    }

    private createColliders(): void {
        const step = (this.to - this.from) / (this.numColliders - 1);

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
                // Create an invisible physics body
                collider = this.scene.physics.add.image(x, y, '')
                    .setVisible(false)
                    .setCircle(this.colliderSize / 2)
                    .setDisplaySize(this.colliderSize, this.colliderSize);
            }

            this.colliders.add(collider);
        }
    }

    public translate(x: number, y: number): void {
        this.colliders.getChildren().forEach(collider => {
            const transform = collider as unknown as Phaser.GameObjects.Components.Transform;
            transform.x += x;
            transform.y += y;
        });
    }

    public rotate(angle: number): void {
        this.colliders.getChildren().forEach(collider => {
            const transform = collider as unknown as Phaser.GameObjects.Components.Transform;
            const distance = Phaser.Math.Distance.Between(transform.x, transform.y, this.centroid.x, this.centroid.y);
            const currentAngle = Phaser.Math.Angle.Between(this.centroid.x, this.centroid.y, transform.x, transform.y);
            transform.x = this.centroid.x + distance * Math.cos(currentAngle + angle);
            transform.y = this.centroid.y + distance * Math.sin(currentAngle + angle);
            transform.rotation += angle;
        });
    }

    public scale(scaleX: number, scaleY: number): void {
        this.colliders.getChildren().forEach(collider => {
            const transform = collider as unknown as Phaser.GameObjects.Components.Transform;
            const distanceX = (transform.x - this.centroid.x) * scaleX;
            const distanceY = (transform.y - this.centroid.y) * scaleY;
            transform.x = this.centroid.x + distanceX;
            transform.y = this.centroid.y + distanceY;
            transform.scaleX *= scaleX;
            transform.scaleY *= scaleY;
        });
    }
}

export default LineCollider;