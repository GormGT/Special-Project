// dom
const enemyContainer = document.querySelector('.enemyContainer');

// global variables
let enemyList = [];
let weaponList = [];

// enemy names - each enemy will spawn with one of these random names - can be replaced with images later
const enemyNames = ['Bob Bobberson', 'Test Guy', 'Cool Guy', 'Bad Guy', 'L', 'The guy on the street'];

// randomly create an enemy
const createEnemy = function(names, weapons) {
    // use a random name from the names array above
    const eName = enemyNames[Math.floor(Math.random() * enemyNames.length)];

    // uses an instance of the id class. enemyId.use(); increments the id, and returns it
    const eId = enemyId.use();

    // generate random health between 100-200
    const eHealth = Math.floor(Math.random() * 100) + 100;

    // all enemies use the same weapon for now
    const eWeapon = weaponList[0];

    // put all the properties together
    const enemy = new Enemy(eName, eId, eHealth, eWeapon);

    return enemy;
}

// id class (each enemy spawns with an incrementing id, this can be used for giving other items an id, by creating another instance of this class)
class Id {
    // when a new instance of this class is created, the id starts at 0
    constructor(id) {
        this.id = id;
    }

    // increments the id, and returns it
    use() {
        this.id++;
        return this.id;
    }
}

// weapon class (used to construct/make weapons stored in an array, that can then be "given" to the player or an enemy)
class Weapon {
    constructor(name, damage) {
        this.name = String(name);
        this.damage = Number(damage);
    }
}

// player class (only one instance of a time)
class Player {
    constructor(name, health, weapon) {
        this.name = String(name);
        this.health = Number(health);
        this.weapon = Object(weapon);
    }

    // handle incoming damage (returns true/false if the player dies)
    calcDmg(dmg) {
        this.health -= dmg;

        if (this.health < 1) {
            console.log(`The player ${this.name} died.`);
            return true;
        } else {
            console.log(`The player ${this.name} has ${this.health} health`);
            return false;
        }
    }

    // use weapon on target (enemy)
    use(weapon, targetId) {
        enemyList.forEach(enemy => {
            if (enemy.id === targetId) {
                enemy.calcDmg(weapon.damage);
            }
        });
    }
}

// enemy class
class Enemy {
    constructor(name, id, health, weapon) {
        this.name = name;
        this.id = id;
        this.health = health;
        this.weapon = weapon;
    }

    // handle incoming damage (returns true/false if the enemy dies)
    calcDmg(dmg) {
        this.health -= dmg;

        if (this.health < 1) {
            console.log(`The enemy ${this.name} died!`);
            return true;
        } else {
            console.log(`The enemy ${this.name} has ${this.health} hp`);
            return false;
        }
    }

    // use an item on a target (the player)
    use(weapon) {
        player.calcDmg(weapon.damage);
    }
}

// create id instances
const enemyId = new Id(-1);

// create weapon instances
weaponList.push(new Weapon('G-18', 16));

// create player & enemy instances
const player = new Player('Player', 100, weaponList[0]);
// enemyList.push(new Enemy('Smol boi', 100, weaponList[0]));
// enemyList.push(new Enemy('Big boi', 200, weaponList[0]));

// log enemies & player
console.log(player);
console.log(weaponList);
// console.log(enemyList);

// spawn enemies
function spawnEnemy() {
    enemyList.push(createEnemy(enemyNames, weaponList));

    const htmlTemp = `
        <button class="enemy" onclick="player.use(player.weapon, ${enemyId.id})">${enemyList[enemyId.id].name}</button>
    `;

    enemyContainer.innerHTML += htmlTemp;
}

spawnEnemy();