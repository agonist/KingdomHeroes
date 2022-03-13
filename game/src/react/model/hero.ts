export class HeroItem {
    name: string
    id: number

    constructor(name = "", id: number) {
        this.name = name
        this.id = id
    }
}

export function buildHeroes(heroesIds: number[]): Array<HeroItem> {
    const heroes = Array<HeroItem>()

    for (let i = 0; i < heroesIds.length; i++) {
        heroes.push(new HeroItem("Heroes #" + heroesIds[i], heroesIds[i]))
    }
    return heroes
}
