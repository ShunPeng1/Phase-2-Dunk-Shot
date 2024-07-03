class UiGridLayout<T extends Phaser.GameObjects.GameObject> extends Phaser.GameObjects.Container {

    private grid: T[][];
    private offsetX: number;
    private offsetY: number;
    private spacingX: number;
    private spacingY: number;

    constructor(scene: Phaser.Scene, x: number, y: number, offsetX: number, offsetY: number, spacingX: number, spacingY: number) {
        super(scene, x, y);
        
        this.scene = scene;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.spacingX = spacingX;
        this.spacingY = spacingY;
        this.grid = [];
    }

    public createGrid(columns: number, rows: number, factoryFunction: (scene: Phaser.Scene, x: number, y: number) => T): void {
        for (let y = 0; y < rows; y++) {
            this.grid[y] = [];
            for (let x = 0; x < columns; x++) {
                const posX = this.offsetX + x * (this.scaleX + this.spacingX);
                const posY = this.offsetY + y * (this.scaleY + this.spacingY);
                const gameObject = factoryFunction(this.scene, posX, posY);

                this.add(gameObject); // Add the gameObject to the container for automatic positioning and rendering.
                this.grid[y][x] = gameObject;
            }
        }
    }

    // Optional: Method to remove the grid or a specific button
    removeGrid(): void {
        for (let row of this.grid) {
            for (let gameObject of row) {
                gameObject.destroy();
            }
        }
        this.grid = [];
    }

    removeButton(column: number, row: number): void {
        if (this.grid[row] && this.grid[row][column]) {
            this.grid[row][column].destroy();
        }
    }
}

export default UiGridLayout;