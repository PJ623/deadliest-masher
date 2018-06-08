// STAGE
function Stage(length) {

    // Make sure stage is at least 6 units long.
    if (length < 6) {
        console.log("ERROR, throw error");
        return false;
    }

    // Set up rows.
    this.length = length;
    this.actionRow = new Array(length);
    this.fighterRow = new Array(length);

    // Determine fighter positions and place the fighters onto the stage.
    fighter1.position = Math.floor((length / 2) - 2);
    fighter2.position = Math.ceil((length / 2) + 1);
    this.fighterRow[fighter1.position] = fighter1;
    this.fighterRow[fighter2.position] = fighter2;

    // Convert Stage into string for rendering purposes.
    this.toString = function toString() {
        let str = "";

        for (let i = 0; i < this.actionRow.length; i++) {
            if(this.actionRow[i] != null){
                str += this.actionRow[i].key;
            } else {
                str += " ";
            }
        }

        //console.log(this.actionRow);

        str += "\n";

        for (let i = 0; i < this.fighterRow.length; i++) {
            if (this.fighterRow[i] == fighter1) {
                str += fighter1.key;
            } else if (this.fighterRow[i] == fighter2) {
                str += fighter2.key;
            } else {
                str += "_";
            }
        }

        //console.log(this.fighterRow);

        return str;
    }
}