let state = Array(4).fill().map(() => Array(4).fill(''));
let turn = "X"
let win_state = false
/**
 * 
 * @param {String[][]} current_state 
*/
function update_display(current_state) {
    let req_table = document.getElementById("ttt-table");
    for (let i = 0; i < 4; i++) {
        let row = req_table.children[0].children[i];
        for (let j = 0; j < 4; j++) {
            row.children[j].innerHTML = current_state[i][j];
        }
    }
}

/**
 * 
 * @param {String[][]} current_state 
 * @param {String} player
 * @returns {Boolean}
 */
function has_won(current_state) {
    for (let player of ['X', 'O']) {
        if (current_state.some(row => row.every(cell => cell === player))) {
            return player;
        }
        for (i = 0; i < 4; i++) {
            if (current_state.map(row => row[i]).every(cell => cell === player)) {
                return player; // Check columns
            }
        }
        if (current_state.map((row, i) => row[i]).every(cell => cell === player)) {
            return player; // Check diagonal
        }
        if (current_state.map((row, i) => row[3 - i]).every(cell => cell === player)) {
            return player; // Check the other diagonal
        }
    }
    return ""
}

/**
 * 
 * @param {string[][]} current_state
 * @returns {Boolean}
 */
function is_full(current_state) {
    return current_state.every(row => row.every(cell => cell !== ''));
}

/**
 * 
 * @param {string[][]} current_state 
 */
function reset_game(current_state) {
    state = Array(4).fill().map(() => Array(4).fill(''));
    turn = "X";
    update_display(state);
    win_state = false
    document.getElementById("win-indicator").innerHTML = "Game in progress"
}

/**
 * 
 * @param {HTMLElement} evt
 */
function handle_click(evt) {
    if (win_state) return;
    let num = evt.target.id.split('-').at(-1) - 1;
    let rowid = Math.floor(num / 4);
    let colid = num % 4;
    console.log(num, rowid, colid);
    update_turn(state, rowid, colid)
}

/**
 * 
 * @param {string[][]} current_state 
 * @param {Number} rowid 
 * @param {Number} colid 
 */
function update_turn(current_state, rowid, colid) {
    switch (turn) {
        case 'X':
            if (state[rowid][colid] === '') {
                state[rowid][colid] = 'X';
                turn = 'O';
            }
            break;
        case 'O':
            if (state[rowid][colid] === '') {
                state[rowid][colid] = 'O';
                turn = 'X';
            }
            break;
        default:
            console.error("Something very bad happened")
            break;
    }
    update_display(current_state)
    switch (has_won(current_state)) {
        case 'X':
            console.log("X won!")
            document.getElementById("win-indicator").innerHTML = "X won!"
            win_state = true
            break;
        case 'O':
            console.log("O won!")
            document.getElementById("win-indicator").innerHTML = "O won!"
            win_state = true
            break;
        default:
            document.getElementById("win-indicator").innerHTML = "Game in progress"
            break;
    }
}

window.onload = function () {
    Array.from(document.getElementsByClassName("game-cell")).forEach(elt => elt.addEventListener('click', handle_click));
    update_display(state);
}