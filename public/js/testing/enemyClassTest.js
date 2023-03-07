// dom
const enemyContainer = document.querySelector('.enemyContainer');

// global variables
let enemyList = [];
let weaponList = [];
let freeSlots = [1, 2, 3, 4, 5];

// enemy names - each enemy will spawn with one of these random names - can be replaced with images later
const enemyNames = ['Bob Bobberson', 'Test Guy', 'Cool Guy', 'Bad Guy', 'LLLLLLLLLLLL', 'The guy on the street'];

// delay
const sleep = function(ms) {
    const startDate = Date.now();
    let endDate = Date.now();

    while(endDate - startDate < ms) {
        endDate = Date.now();
    }
}

// randomly create an enemy
const createEnemy = function(names, weapons) {
    // use a random name from the names array above
    const eName = names[Math.floor(Math.random() * enemyNames.length)];

    // uses an instance of the id class. enemyId.use(); increments the id, and returns it
    const eId = enemyId.use();

    // generate random health between 100-200
    const eHealth = Math.ceil(Math.random() * 2);

    // all enemies use the same weapon for now
    const eWeapon = weapons[0];

    // get random slot
    const eSlot = freeSlots[Math.floor(Math.random() * freeSlots.length)];
    freeSlots.splice(freeSlots.indexOf(eSlot), 1);

    // put all the properties together
    const enemy = new Enemy(eName, eId, eHealth, eWeapon, eSlot);

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
    constructor(name, damage, fpc, fpcRate, fireRate) {
        this.name = String(name);
        this.damage = Number(damage);
        this.firePerClick = Number(fpc);
        this.fpcRate = Number(fpcRate);
        this.fireRate = Number(fireRate);
        this.usable = true;
    }
    use(target) {
        if (this.usable) {
            this.usable = false; // sets cooldown

            // fire weapon
            for (let i = 0; i < this.firePerClick; i++) {
                target.calcDmg(this.damage)

                // delay next shot
                sleep(this.fpcRate);
            }

            // finish cooldown
            sleep(this.fireRate);
            this.usable = true;
        }
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
            alert('you died, press ok to refresh!');
            window.location.reload();
        } else {
            console.log(`The player ${this.name} has ${this.health} health`);
            return false;
        }
    }

    // use weapon on target (enemy)
    use(weapon, targetId) {
        // loop through each enemy, check if id matches of target id
        enemyList.forEach(enemy => {
            if (enemy.id === targetId) {
                // if target found, calculate incoming damage. if calculating returns true, that means the enemy died.
                weapon.use(enemy);
            }
        });
    }
}

// enemy class
class Enemy {
    constructor(name, id, health, weapon, slot) {
        this.name = name;
        this.id = id;
        this.health = health;
        this.weapon = weapon;
        this.slot = slot; // used to store which slot the enemy is located in
    }

    // handle incoming damage (returns true/false if the enemy dies)
    calcDmg(dmg) {
        this.health -= dmg;

        if (this.health < 1) {
            console.log(`enemy ${this.name} died`);

            // loop through enemies until the affected enemy is found
            for (let i = 0; i < enemyList.length; i++) {
                // enemy found
                if (enemyList[i].id === this.id) {
                    // delete enemy from document
                    const delEnemySlot = document.querySelector(`div.slot${this.slot}`);
                    delEnemySlot.innerHTML = '';

                    // free the slot used by enemy
                    freeSlots.push(enemyList[i].slot);

                    // delete enemy from array
                    enemyList.splice(i, 1);
                }
            }
            // enemy died
            return this.slot;
        } else {
            console.log(`enemy ${this.name} has ${this.health} health`);
            // enemy survived
            return false;
        }
    }

    // use an item on a target (the player)
    use(weapon) {
        player.calcDmg(weapon.damage);
        playAudio('/audio/dsdshtgn.wav');
    }
}

// create id instances
const enemyId = new Id(-1);

// create weapon instances
weaponList.push(new Weapon('G-18', 5, 1, null, 1000));
weaponList.push(new Weapon('Burst Rifle', 1.3, 4, 125, 1000));

// create player instance
const player = new Player('Player', 10, weaponList[0]);
+

// log enemies & player
console.log(player);
console.log(weaponList);

// spawn enemies
function spawnEnemy() {
    if (freeSlots.length) {
        enemyList.push(createEnemy(enemyNames, weaponList));

        const currEnemy = enemyList[enemyList.length - 1];

        const htmlTemp = `
            <button id="id${enemyId.id}" class="enemy" onclick="player.use(player.weapon, ${enemyId.id})">${currEnemy.name}</button>
        `;

        // put enemy into correct slot
        const enemySlot = document.querySelector(`div.slot${currEnemy.slot}`);

        enemySlot.innerHTML = htmlTemp;

        setInterval(() => {
            let enemyAlive;
            enemyList.forEach(listedEnemy => {
                if (currEnemy.id === listedEnemy.id) {
                    enemyAlive = true;
                }
            });

            if (enemyAlive) {
                currEnemy.use(currEnemy.weapon);
            }
        }, 1500);

        return enemyList;
    }
}

setInterval(spawnEnemy, 1000)
