class InventoryManager {
    private static instance: InventoryManager;
    private inventory: { [key: string]: number };
    private subscribers: { [key: string]: Array<(from : number, to: number) => void> };

    private constructor() {
        this.inventory = {};
        this.subscribers = {}; 
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
            let from = this.inventory[item];
            this.inventory[item] += quantity;
            this.notifySubscribers(item, from);
        } else {
            let from = 0;
            this.inventory[item] = quantity;
            this.notifySubscribers(item, from);
        }
        
        this.saveInventory();
    }

    public removeItem(item: string, quantity: number) {
        if (this.inventory[item] && this.inventory[item] >= quantity) {
            let from = this.inventory[item];
            this.inventory[item] -= quantity;

            
            this.notifySubscribers(item, from);
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

    
    public subscribe(item: string, callback: (quantity: number) => void) {
        if (!this.subscribers[item]) {
            this.subscribers[item] = [];
        }
        this.subscribers[item].push(callback);
    }

    public unsubscribe(item: string, callback: (quantity: number) => void) {
        if (this.subscribers[item]) {
            const index = this.subscribers[item].indexOf(callback);
            if (index !== -1) {
                this.subscribers[item].splice(index, 1);
            }
        }
    }

    private notifySubscribers(item: string, from : number) {
        if (this.subscribers[item]) {
            const to = this.inventory[item] || 0;
            this.subscribers[item].forEach(callback => callback(from, to));
        }
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