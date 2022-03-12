export class InventoryItem {
    name: string
    type: InventoryItemType

    constructor(name = "", type: InventoryItemType) {
        this.name = name
        this.type = type
    }
}

export enum InventoryItemType {
    KEY
}


export function buildInventory(keysBalance: number): Array<InventoryItem> {
    const inventory = Array<InventoryItem>()

    for (let i = 0; i < keysBalance; i++) {
        inventory.push(new InventoryItem("Kingdom Keys", InventoryItemType.KEY))
    }
    return inventory
}
