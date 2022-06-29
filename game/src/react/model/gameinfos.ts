import {BC} from "./user";

export interface Gameinfos {
    bc: BC[]
}

export function bcForId(id: number, bc: BC[]): number {
    return bc.find(b => b.id === id)!.count
}
