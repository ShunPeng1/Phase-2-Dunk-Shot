import Phaser from 'phaser';
import CustomCollider from './CustomCollider';


class PolygonCollider extends CustomCollider {
    private points: Phaser.Geom.Point[];
    private width: number;
    private isLoop: boolean;
    private visual: ColliderVisual;
    private centroid: Phaser.Geom.Point;


    constructor(scene: Phaser.Scene, points: Phaser.Geom.Point[], width: number, isLoop: boolean, visual : ColliderVisual) {
        super(scene);
        
        this.points = points;
        this.width = width;
        this.isLoop = isLoop;
        this.visual = visual;

        // Calculate the centroid of the polygon for centralized transformations
        this.centroid = Phaser.Geom.Point.GetCentroid(points);
        

        this.createColliders();
    }

    private createColliders() : void {
        const len = this.isLoop ? this.points.length : this.points.length - 1;

        for (let i = 0; i < len; i++) {
            const startPoint = this.points[i];
            const endPoint = this.points[(i + 1) % this.points.length];

            const distance = Phaser.Math.Distance.BetweenPoints(startPoint, endPoint);
            const angle = Phaser.Math.Angle.BetweenPoints(startPoint, endPoint);

            console.log("Polligon ", i, distance, angle);

            let collider : Phaser.GameObjects.GameObject;
            
            if (this.visual.type === 'image') {
                collider = this.scene.physics.add.image(
                    (startPoint.x + endPoint.x) / 2,
                    (startPoint.y + endPoint.y) / 2,
                    this.visual.key
                )
                .setRotation(angle)
                .setDisplaySize(distance, this.width);
            } else if (this.visual.type === 'sprite') {
                collider = this.scene.physics.add.sprite(
                    (startPoint.x + endPoint.x) / 2,
                    (startPoint.y + endPoint.y) / 2,
                    this.visual.key
                )
                .setRotation(angle)
                .setDisplaySize(distance, this.width);
            }
            else{
                // Create an invisible physics body
                collider = this.scene.physics.add.image(
                    (startPoint.x + endPoint.x) / 2,
                    (startPoint.y + endPoint.y) / 2,
                    ''
                )
                .setVisible(false)
                .setRotation(angle)
                .setDisplaySize(distance, this.width);
            }

            this.colliders.add(collider); // Add to the Physics Group
        }
    }

    // Example transformation methods
    public translate(x: number, y: number) : void {
        this.colliders.getChildren().forEach(collider => {
            const transform = collider as unknown as Phaser.GameObjects.Components.Transform;
            transform.x += x;
            transform.y += y;
        });
    }

    public rotate(angle: number) : void {
        this.colliders.getChildren().forEach(collider => {
            const transform = collider as unknown as Phaser.GameObjects.Components.Transform;
            const distance = Phaser.Math.Distance.Between(transform.x, transform.y, this.centroid.x, this.centroid.y);
            const currentAngle = Phaser.Math.Angle.Between(this.centroid.x, this.centroid.y, transform.x, transform.y);
            transform.x = this.centroid.x + distance * Math.cos(currentAngle + angle);
            transform.y = this.centroid.y + distance * Math.sin(currentAngle + angle);
            transform.rotation += angle;
        });
    }

    public scale(scaleX: number, scaleY: number) : void {
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

export default PolygonCollider;