import Phaser from 'phaser';
import CustomPhysicGroupContainer from './CustomPhysicGroupContainer';
import NetArcadeImage from '../hoops/NetArcardImage';
import BasketballHoop from '../hoops/BasketballHoop';

class NetLinePhysicGroupContainer extends CustomPhysicGroupContainer {
    private from: number;
    private to: number;
    private func: (x: number) => number;
    private numColliders: number;
    private colliderSize: number;
    private basketballHoop: BasketballHoop;
    

    constructor(scene: Phaser.Scene, x: number, y: number, from: number, to: number, func: (x: number) => number, numColliders: number, colliderSize: number, basketballHoop: BasketballHoop) {
        super(scene,x,y);

        this.from = from;
        this.to = to;
        this.func = func;
        this.numColliders = numColliders;
        this.colliderSize = colliderSize;
        this.basketballHoop = basketballHoop;

        this.initColliders();
    }

    protected createColliderChildren(): Phaser.GameObjects.GameObject[] {
        const step = (this.to - this.from) / (this.numColliders - 1);

        const colliderChildren: Phaser.GameObjects.GameObject[] = [];

        for (let i = 0; i < this.numColliders; i++) {
            const x = this.from + i * step;
            const y = this.func(x);
            
            const collider = new NetArcadeImage(this.scene,x, y, '', this.basketballHoop)
            .setVisible(false)
            .setCircle(this.colliderSize / 2);

            colliderChildren.push(collider);

        }

        return colliderChildren;
    }

}

export default NetLinePhysicGroupContainer;