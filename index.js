let state = Array(4).fill().map(() => Array(4).fill(''));
let p1 = "X"

/**
 * 
 * @param {String[][]} current_state 
*/
function update_board(current_state) {
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
function has_won(current_state, player) {
    current_state.forEach((row, i) => {
        if (row.every(cell => cell === player)) {
            return true; // Check rows
        }
    });
    for (i = 0; i < 4; i++) {
        if (current_state.map(row => row[i]).every(cell => cell === player)) {
            return true; // Check columns
        }
    }
    if (current_state.map((row, i) => row[i]).every(cell => cell === player)) {
        return true; // Check diagonal
    }
    if (current_state.map((row, i) => row[3 - i]).every(cell => cell === player)) {
        return true; // Check the other diagonal
    }
}

/**
 * 
 * @param {string[][]} current_state
 * @returns {Boolean}
 */
function is_full(current_state) {
    return current_state.every(row => row.every(cell => cell !== ''));
}