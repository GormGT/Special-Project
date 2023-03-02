let enemyList = [];

class Item {
    constructor(name, type, damage) {
        this.name = String(name);
        this.type = String(type);
        this.damage = Number(damage);
    }
}

class Player {
    constructor(name, health, weapon) {
        this.name = String(name);
        this.health = Number(health);
        this.weapon = Object(weapon);
    }

    calcDmg(dmg) {
        this.health -= dmg;

        if (this.health < 1) {
            console.log(`The player ${this.name} died.`);
        } else {
            console.log(`The player ${this.name} has ${this.health} health`);
        }
    }

    use(item, target) {
        target.calcDmg(item.damage);
    }
}

class Enemy {
    constructor(name, health, damage) {
        this.name = name;
        this.health = health;
        this.damage = damage;
    }

    calcDmg(dmg) {
        this.health -= dmg;

        if (this.health < 1) {
            console.log(`The enemy ${this.name} died!`);
        } else {
            console.log(`The enemy ${this.name} has ${this.health} hp`);
        }
    }
}

// create instances
const player = new Player('Player', 100, new Item('G-18', 'weapon', 16))
enemyList.push(new Enemy('Smol boi', 100, 15));
enemyList.push(new Enemy('Big boi', 200, 50));

// log enemies & player
console.log(player);
console.log(enemyList);