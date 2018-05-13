// Set stage

// Restrictions
// Even length stages only
// Minimum stage length is 6
// Only two fighters

let fighters = [new Fighter(), new Fighter(90)];

function Fighter(life) {
    this.state = "wait"; // attacking, throwing, or blocking
    this.life = life || 100;

    this.move = function move() {
        return directions[optionSelect(directions)];
    }
    this.act = function act() {
        return states[optionSelect(states)];
    }
}

const directions = {
    "right": 1,
    "left": -1,
    "none": 0
}

const states = {
    "block": {symbol: "#"},
    "strike": {symbol: "/"},
    "throw": {symbol: "~"},
    "wait": {symbol: " "}
}

// Not really an option select, lmao
function optionSelect(possibilities) {
    let arr = [];
    let roll; 

    for (let possibility in possibilities) {
        arr.push(possibility);
    }

    roll = Math.floor(Math.random() * Math.floor(arr.length));
    console.log("Roll:", roll, "|", "Selected:", arr[roll]);

    return arr[roll];
}

//console.log(optionSelect(states));

function Simulation(length, fighters) {

    let fighter1 = fighters[0];
    let fighter2 = fighters[1];

    const legend = {
        "O": fighter1,
        "0": fighter2
    }

    // Min length is 6
    function setStage() {
        let stage = [];
        let isEven = (length % 2 == 0);
        for (let i = 0; i < 2; i++) {
            stage.push(Array(length));
            if (i == 0) {
                // create status ! 
                for (let j = 0; j < length; j++) {
                    stage[i][j] = " ";
                }
            } else {
                for (let j = 0; j < length; j++) {
                    if (j == (length / 2) - 2) {
                        stage[i][j] = "O";
                    } else if (j == (length / 2) + 1) {
                        stage[i][j] = "0";
                    } else {
                        stage[i][j] = "_";
                    }
                }
            }
        }

        return stage;
    }

    this.stage = setStage(length);

    let stateRow = 0;
    let fightRow = this.stage.length - 1;

    this.hitConfirm = function hitConfirm(fighter, position) {
        // Detect hits on fighters
    }

    // check if movement is valid. if not, just do n
    this.validateMovement = function validateMovement(position, movement) {
        if (this.stage[fightRow][position + movement] == "_") {
            return position + movement;
        }
        return position;
    }

    this.turn = function turn() {
        // Check current stage state
        // Cycle through array, check if fighter
        // Check intentions of combatants
        // Have combatants perform valid actions
        // Somehow alternate turn order
        let fighter;
        let currentChar;
        let newPosition;
        let finished = {};
        let act;

        for (let position = 0; position < this.stage[fightRow].length; position++) {
            fighter = legend[this.stage[fightRow][position]];
            if (fighter && !finished[this.stage[fightRow][position]]) {
                //console.log(fighter);
                currentChar = this.stage[fightRow][position];
                newPosition = this.validateMovement(position, fighter.move());

                this.stage[fightRow][position] = "_";
                this.stage[fightRow][newPosition] = currentChar;
                
                // Act
                //console.log(fighter.act());
                act = fighter.act();
                this.stage[stateRow][position] = " ";
                this.stage[stateRow][newPosition] = act.symbol;
                console.log(act);
                //this.hitConfirm(fighter.act(), position);

                finished[currentChar] = true;
            }
        }
    }

    this.toString = function toString() {
        let str = "";

        for (let i = 0; i < this.stage.length; i++) {
            str += this.stage[i].join("") + "\n";
        }

        return str;
    }

    console.log("Stage:", this.stage);
}



function animate(simulation) {
    // Load
    render(simulation.toString());

    // Re-render for turns
    setInterval(() => {
        simulation.turn();
        render(simulation.toString());
    }, 5000);
}

function render(str) {
    str = str.replace(/\n/, "<br>");
    document.getElementById("stage").innerHTML = str.replace(/ /g, "&nbsp");
    //console.log(str);
}

let fight = new Simulation(8, fighters);
animate(fight);