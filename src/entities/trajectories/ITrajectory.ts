interface ITrajectory {
    draw(startPosition: Phaser.Math.Vector2, force: number, angle: number): void;
    clear(): void;
}

export default ITrajectory;