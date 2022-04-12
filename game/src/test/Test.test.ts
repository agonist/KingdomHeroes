import CombatsManager, {ActionType, Randomizer, TurnType} from "../phaser/core/CombatsManager";
import {Character, Combat, Enemy, EnemyType, Hero} from "../react/model/dungeon";


let h1: Hero
let h2: Hero
let h3: Hero
let h4: Hero

let e1: Enemy
let e2: Enemy
let e3: Enemy
let e4: Enemy

class TestRandomizer implements Randomizer {
    randomInt(min: number, max: number): number {
        return 33;
    }
}

class TestRandomizerOK implements Randomizer {
    randomInt(min: number, max: number): number {
        return 2;
    }
}

describe('CombatManager', () => {

    beforeEach(() => {
        h1 = new Hero(
            "Hero 1",
            1,
            1,
            5,
            5,
            5,
            100
        )
        h2 = new Hero(
            "Hero 2",
            2,
            2,
            5,
            5,
            7,
            100
        )
        h3 = new Hero(
            "Hero 3",
            3,
            2,
            5,
            2,
            2,
            100
        )
        h4 = new Hero(
            "Hero 4",
            4,
            5,
            8,
            2,
            2,
            100
        )
        e1 = new Enemy(
            "Orc 1",
            1,
            1,
            3,
            3,
            3,
            100,
            EnemyType.ORC
        )
        e2 = new Enemy(
            "Orc 2",
            2,
            2,
            3,
            3,
            3,
            100,
            EnemyType.ORC
        )
        e3 = new Enemy(
            "Orc 3",
            3,
            4,
            3,
            3,
            3,
            100,
            EnemyType.ORC
        )
        e4 = new Enemy(
            "Orc 4",
            4,
            8,
            3,
            3,
            3,
            100,
            EnemyType.ORC
        )

    })

    test('1 basic Attack on 1 enemy +- 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.ATTACK, [e1], undefined)

        manager.playHeroesTurn()

        const enemy = manager.combat.enemies.find(e => e.id === e1.id)!


        expect(enemy.hp).toBe(98)
    });

    test('3 basic Attack on 1 enemy +- 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1, h2, h3], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.ATTACK, [e1], undefined)
        manager.addActionForHeroTurn(h2, ActionType.ATTACK, [e1], undefined)
        manager.addActionForHeroTurn(h3, ActionType.ATTACK, [e1], undefined)

        manager.playHeroesTurn()

        const enemy = manager.combat.enemies.find(e => e.id === e1.id)!


        expect(enemy.hp).toBe(84)
    });

    test('2 basic Attack on 2 enemies +- 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1, h2], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.ATTACK, [e1], undefined)
        manager.addActionForHeroTurn(h2, ActionType.ATTACK, [e2], undefined)

        manager.playHeroesTurn()

        const enemy1 = manager.combat.enemies.find(e => e.id === e1.id)!
        const enemy2 = manager.combat.enemies.find(e => e.id === e2.id)!


        expect(enemy1.hp).toBe(98)
        expect(enemy2.hp).toBe(96)
    });

    test('1 basic Attack on 1 enemy + critical hit +- 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1], combat, new TestRandomizerOK())

        manager.addActionForHeroTurn(h1, ActionType.ATTACK, [e1], undefined)

        manager.playHeroesTurn()

        const enemy = manager.combat.enemies.find(e => e.id === e1.id)!


        expect(enemy.hp).toBe(97)
    });

    test('1 basic Attack on 1 enemy ++ 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h4], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h4, ActionType.ATTACK, [e1], undefined)

        manager.playHeroesTurn()

        const enemy = manager.combat.enemies.find(e => e.id === e1.id)!


        expect(enemy.hp).toBe(62)
    });

    test('1 basic Attack on 1 enemy -- 2 levels', () => {
        const combat: Combat = {
            enemies: [e3],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.ATTACK, [e3], undefined)

        manager.playHeroesTurn()

        const enemy = manager.combat.enemies.find(e => e.id === e3.id)!


        expect(enemy.hp).toBe(98)
    });

    test('1 basic Attack on 1 enemy -- 2 levels again', () => {
        const combat: Combat = {
            enemies: [e4],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h4], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h4, ActionType.ATTACK, [e4], undefined)

        manager.playHeroesTurn()

        const enemy = manager.combat.enemies.find(e => e.id === e4.id)!


        expect(enemy.hp).toBe(87)
    });


    test('1 basic Attack on 1 hero +- 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1], combat, new TestRandomizer())

        manager.addActionForEnemyTurn(e1, ActionType.ATTACK, [h1], undefined)

        manager.playEnemiesTurn()

        const enemy = manager.heroes.find(e => e.id === h1.id)!


        expect(enemy.hp).toBe(98)
    });

    test('Defense on 1 hero 50% reduction', () => {
        const combat: Combat = {
            enemies: [e4],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1, h2], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.DEFENSE, undefined, h2)
        manager.addActionForEnemyTurn(e4, ActionType.ATTACK, [h2], undefined)

        manager.playFight()

        const enemy = manager.heroes.find(e => e.id === h2.id)!


        expect(enemy.hp).toBe(92)
    })

    test('magic Attack on 3 enemy +- 2 levels', () => {
        const combat: Combat = {
            enemies: [e1, e2, e3],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.MAGIC_ATTACK, [e1, e2, e3], undefined)

        manager.playHeroesTurn()

        const enemy1 = manager.combat.enemies.find(e => e.id === e1.id)!
        const enemy2 = manager.combat.enemies.find(e => e.id === e2.id)!
        const enemy3 = manager.combat.enemies.find(e => e.id === e3.id)!


        expect(enemy1.hp).toBe(98)
        expect(enemy2.hp).toBe(99)
        expect(enemy3.hp).toBe(99)
    });

    test('heal ally', () => {
        const combat: Combat = {
            enemies: [e4],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.HEAL, undefined, h1)
        manager.addActionForEnemyTurn(e4, ActionType.ATTACK, [h1], undefined)
        manager.addActionForEnemyTurn(e4, ActionType.ATTACK, [h1], undefined)
        manager.addActionForEnemyTurn(e4, ActionType.ATTACK, [h1], undefined)

        manager.playEnemiesTurn()
        manager.playHeroesTurn()

        const h = manager.heroes.find(e => e.id === h1.id)!


        expect(h.hp).toBe(60)
    });

    test('complex fight', () => {
        const combat: Combat = {
            enemies: [e1, e2, e3],
            order: 1,
            won: false
        }

        const manager: CombatsManager = new CombatsManager([h1, h2, h3], combat, new TestRandomizer())

        manager.addActionForHeroTurn(h1, ActionType.MAGIC_ATTACK, [e1, e2, e3], undefined)
        manager.addActionForHeroTurn(h2, ActionType.ATTACK, [e1], undefined)
        manager.addActionForHeroTurn(h3, ActionType.ATTACK, [e1], undefined)

        manager.playFight()
    })
});
