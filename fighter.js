// FIGHTER
function Fighter(key, name, life) {
    this.key = key;
    this.name = name;
    this.life = life;
    this.position = null;
    this.actions = {
        strike: new Action("/", "strike", 1, 10, 0),
        block: new Action("#", "block", 0, 0, 10),
        throw: new Action("~", "throw", 1, 10, 0),
        wait: new Action(" ", "wait", 0, 0, 0)
    };

    this.action = this.actions.wait;
}

// Maybe not needed for now
function Action(key, name, range, damage, protection) {
    this.key = key;
    this.name = name;
    this.range = range;
    this.damage = damage;
    this.protection = protection;
}

// Hitconfirm
// Damage

Fighter.prototype.move = function move() {
    const movementOptions = {
        forward: 1,
        backward: -1,
        neutral: 0
    }

    let newPosition = this.position;

    newPosition += optionSelect(movementOptions);

    // Make sure move is legal. Stay still if move is illegal.
    if (newPosition > -1 && newPosition < stage.length && stage.fighterRow[newPosition] == null) {
        stage.fighterRow[this.position] = null;
        stage.actionRow[this.position] = null;
        this.position = newPosition;
        stage.fighterRow[this.position] = this;
    }
}

Fighter.prototype.act = function act() {
    this.action = optionSelect(this.actions);
    stage.actionRow[this.position] = this.action;
    //console.log(stage.actionRow);
}

function optionSelect(actions) {
    let outcomes = [];
    let outcome;

    for (let action in actions) {
        outcomes.push(actions[action]);
    }

    outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    return outcome;
}