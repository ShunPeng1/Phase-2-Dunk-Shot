class InventoryManager {
    private static instance: InventoryManager;
    private inventory: { [key: string]: number };

    private constructor() {
        this.inventory = {};
        this.loadInventory();
    }

    public static getInstance(): InventoryManager {
        if (!InventoryManager.instance) {
            InventoryManager.instance = new InventoryManager();
        }
        return InventoryManager.instance;
    }

    public addItem(item: string, quantity: number) {
        if (this.inventory[item]) {
            this.inventory[item] += quantity;
        } else {
            this.inventory[item] = quantity;
        }
        this.saveInventory();
    }

    public removeItem(item: string, quantity: number) {
        if (this.inventory[item] && this.inventory[item] >= quantity) {
            this.inventory[item] -= quantity;
            if (this.inventory[item] === 0) {
                delete this.inventory[item];
            }
            this.saveInventory();
        }
    }

    public getItem(item: string) {
        return this.inventory[item];
    }

    public getInventory() {
        return this.inventory;
    }

    private saveInventory() {
        localStorage.setItem('inventory', JSON.stringify(this.inventory));
    }

    private loadInventory() {
        const inventory = localStorage.getItem('inventory');
        if (inventory) {
            this.inventory = JSON.parse(inventory);
        }
    }
}

export default InventoryManager;