export interface MetadataModel {
    name: string,
    description: string
    id: number,
    image: string,
    attributes: StatsAttributes[],
}

export interface Attribute {
    trait_type: string,
    value: any
}

export interface StatsAttributes extends Attribute {
    display_type: string,
}

export function getLevel(attributes: StatsAttributes[]): number {
    return attributes.find(a => a.trait_type === "Level")!.value
}

export function getHP(attributes: StatsAttributes[]): number {
    return attributes.find(a => a.trait_type === "HP")!.value
}

export function getAttack(attributes: StatsAttributes[]): number {
    return attributes.find(a => a.trait_type === "Attack")!.value
}

export function getDefense(attributes: StatsAttributes[]): number {
    return attributes.find(a => a.trait_type === "Defense")!.value
}

export function getSpeed(attributes: StatsAttributes[]): number {
    return attributes.find(a => a.trait_type === "Speed")!.value
}

export function getEquipment(attributes: Attribute[], type: string): string {
    return attributes.find(a => a.trait_type === type)!.value
}


