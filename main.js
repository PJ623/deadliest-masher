// INSTANCE
// Order is important.
let fighters = [new Fighter("O", "F1", 100), new Fighter("0", "F2", 100)];

let fighter1 = fighters[0];
let fighter2 = fighters[1];
let stage = new Stage(6);

function render(str) {
    str = str.replace(/\n/, "<br>");
    document.getElementById("stage").innerHTML = str.replace(/ /g, "&nbsp");
}

function turn(fighter) {
    fighter.move();
    fighter.act();
}

function animate() {
    render(stage.toString());

    //let lifeDiv = document.getElementById("life-totals");
    let life1 = document.getElementById("life1");
    let life2 = document.getElementById("life2");

    let simulation = setInterval(() => {
        turn(fighter1);
        turn(fighter2);

        render(stage.toString()); // Move below?

        hitConfirm(fighter1, fighter2);
        hitConfirm(fighter2, fighter1);

        // Damage calculation and cleanup
        console.log(fighter1.action.name, "|", fighter2.action.name);
        console.log(fighter1.life, "|", fighter2.life);

        life1.innerHTML = fighter1.life;
        life2.innerHTML = fighter2.life;

        if(fighter1.life <= 0 || fighter2.life <= 0){
            clearInterval(simulation);
        }

    }, 2000);
}

function hitConfirm(attacker, defender) {
    let distance = Math.abs(attacker.position - defender.position);

    if (attacker.action.range >= distance) {
        console.log("HIT CONFIRMED");

        if (attacker.action.name == "strike") {
            if (defender.action.name == "block") {
                //console.log(defender.name, "blocked!");
            } else {
                defender.life -= attacker.action.damage;
                //console.log(defender.name, "struck.");
                //console.log(defender.name, "life:", defender.life);
            }
        }

        if (attacker.action.name == "throw") {
            if (defender.action.name == "throw" || defender.action.name == "strike") {
                //console.log("Throw nullified.");
            } else {
                defender.life -= attacker.action.damage;
                //console.log(defender.name, "thrown.");
                //console.log(defender.name, "life:", defender.life);
            }
        }
    }
}

animate();