import {ActionType, Combat, Enemy, EnemyType} from "./schemas/dungeon.schemas";
import {Stats} from "../metadata/metadata.service";
import {Logger} from "@nestjs/common";

export class CombatGenerator {

    enemiesTable: Map<EnemyType, EnemyTable> = new Map<EnemyType, EnemyTable>()
    private logger = new Logger();

    constructor() {
        this.enemiesTable.set(
            EnemyType.ORC, {
                attackMultiplier: 0.8,
                defenseMultiplier: 1,
                speedMultiplier: 0.5,
                hpMultiplier: 1
            }
        )

        this.enemiesTable.set(
            EnemyType.DRAGON, {
                attackMultiplier: 0.75,
                defenseMultiplier: 0.75,
                speedMultiplier: 1.25,
                hpMultiplier: 1
            }
        )

        this.enemiesTable.set(
            EnemyType.BEAST, {
                attackMultiplier: 1.25,
                defenseMultiplier: 0.75,
                speedMultiplier: 0.75,
                hpMultiplier: 1
            }
        )
    }

    generateCombats(heroesData: Stats[]): Combat[] {
        let averageAttack = 0
        heroesData.forEach(h => averageAttack += h.attack)
        averageAttack = averageAttack / heroesData.length

        let averageDefense = 0
        heroesData.forEach(h => averageDefense += h.defense)
        averageDefense = averageDefense / heroesData.length

        let averageSpeed = 0
        heroesData.forEach(h => averageSpeed += h.speed)
        averageSpeed = averageSpeed / heroesData.length

        let averageHp = 0
        heroesData.forEach(h => averageHp += h.hp)
        averageHp = averageHp / heroesData.length

        let averageLevel = 0
        heroesData.forEach(h => averageLevel += h.level)
        averageLevel = averageLevel / heroesData.length

        const combatCount = 8

        let minEnnemies = 1
        let maxEnnemies = 0
        if (heroesData.length == 1) {
            minEnnemies = 1
            maxEnnemies = 2
        }
        if (heroesData.length == 2) {
            minEnnemies = 2
            maxEnnemies = 3
        }
        if (heroesData.length == 3) {
            minEnnemies = 3
            maxEnnemies = 4
        }
        if (heroesData.length == 4) {
            minEnnemies = 4
            maxEnnemies = 5
        }

        const combat1: Combat = {
            order: 1,
            won: false,
            enemies: this.genFirstFight(averageAttack, averageDefense, averageSpeed, averageHp, averageLevel, minEnnemies)
        }

        const combat2: Combat = {
            order: 2,
            won: false,
            enemies: this.genSecondFight(averageAttack, averageDefense, averageSpeed, averageHp, averageLevel, maxEnnemies)
        }

        return [combat1, combat2]
    }

    genFirstFight(avAttack: number, avDefense: number, avSpeed: number, avHp: number, avgLevel: number, minEnemy: number): Enemy[] {
        const enemies = []
        const multiplier = 0.8
        enemies.push(
            this.generateEnemy("Orc 1", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
        )

        if (minEnemy >= 2) {
            enemies.push(
                this.generateEnemy("Orc 2", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
            )
        }

        if (minEnemy >= 3) {
            enemies.push(
                this.generateEnemy("Orc 3", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
            )
        }

        if (minEnemy >= 4) {
            enemies.push(
                this.generateEnemy("Orc 4", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
            )
        }

        return enemies
    }

    genSecondFight(avAttack: number, avDefense: number, avSpeed: number, avHp: number, avgLevel: number, minEnemy: number): Enemy[] {
        const enemies = []
        const multiplier = 0.9
        enemies.push(
            this.generateEnemy("Orc 1", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
        )

        if (minEnemy >= 2) {
            enemies.push(
                this.generateEnemy("Orc 2", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
            )
        }

        if (minEnemy >= 3) {
            enemies.push(
                this.generateEnemy("Orc 3", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
            )
        }

        if (minEnemy >= 4) {
            enemies.push(
                this.generateEnemy("Orc 4", avAttack * multiplier, avDefense * multiplier, avSpeed * multiplier, avHp * multiplier, avgLevel, EnemyType.ORC)
            )
        }

        return enemies
    }

    private generateEnemy(name: string, avAttack: number, avDefense: number, avSpeed: number, avHp: number, avLevel: number, type: EnemyType): Enemy {
        const enemyTable = this.enemiesTable.get(type)

        const enemy: Enemy = {
            name: name,
            type: type,
            level: avLevel,
            attack: avAttack * enemyTable.attackMultiplier,
            defense: avDefense * enemyTable.defenseMultiplier,
            speed: avSpeed * enemyTable.speedMultiplier,
            hp: avHp * enemyTable.hpMultiplier,
            skills: [ActionType.ATTACK]
        }
        return enemy
    }
}


interface EnemyTable {
    attackMultiplier: number,
    defenseMultiplier: number,
    speedMultiplier: number,
    hpMultiplier: number
}
