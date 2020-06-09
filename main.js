var maxRow = 6;
var maxCol = 7; //max
var error = document.getElementById('error');
var currentPlayer = 'Red'; //Yellow
var gridArray = [];
var container = document.querySelector('div.container');
var buttonContainer = document.querySelector('div.buttonContainer');
var reset = document.getElementById('reset');
var timer = document.querySelector('h1.time');
var turnTime = 20;

reset.addEventListener('click', resetGame);

var countdown = setInterval(handleTime, 1000);

function handleTime() {
	if (turnTime === 0) {
		error.textContent = currentPlayer + ' has been skipped';
		clearInterval(countdown);
		countdown = setInterval(handleTime, 1000);
		switchPlayer();
		timer.textContent = 20;
		turnTime = 20;
	} else {
		turnTime--;
		timer.textContent--;
	}
}

for (var i = maxRow - 1; i >= 0; i--) {
	gridArray[i] = [];
	for (var j = 0; j < maxCol; j++) {
		//0,0 is bottom left
		var spot = document.createElement('div');
		spot.classList.add('col-' + j);
		spot.classList.add('row-' + i);
		spot.classList.add('spot');
		container.appendChild(spot);
		gridArray[i][j] = null; //internal grid
	}
}

for (var i = 0; i < maxCol; i++) {
	var button = document.createElement('button');
	button.textContent = ' ' + i;
	button.setAttribute('col', i);
	button.addEventListener('click', addTile);
	buttonContainer.appendChild(button);
}

function addTile() {
	if (countdown != null) clearInterval(countdown);
	countdown = null;
	turnTime = 20;
	timer.textContent = 20;
	countdown = setInterval(handleTime, 1000);
	error.textContent = '';
	var currCol = event.currentTarget.getAttribute('col'); //maxCol
	//console.log(event.currentTarget.ge//tAttribute('col'));
	for (var rowNum = 0; rowNum < maxCol; rowNum++) {
		// find the first empty row in the maxCol
		if (rowNum == 6) {
			error.textContent = 'maxCol is full, try again';
			return;
		}
		if (gridArray[rowNum][currCol] === null) {
			gridArray[rowNum][currCol] = currentPlayer;
			colorTile(rowNum, currCol);
			checkWin(rowNum, currCol);
			//if (checkWin(rowNum, currCol)){
			//    break;
			//}
			switchPlayer();
			break; // if value is assigned to tile, break out of loop
		}
	}
	return;
}

function colorTile(row, col) {
	var localRow = document.getElementsByClassName('row-' + row);
	var element = localRow[col];
	element.classList.add(currentPlayer);
}

function checkWin(rowNum, col) {
	var localMax = 0;
	var currentCol = col;
	var currentRow = rowNum;

	// check vertically
	for (var i = 0; i < maxRow; i++) {
		if (gridArray[i][currentCol] !== null) {
			//if empty, stop checking
			if (gridArray[i][currentCol] == currentPlayer) {
				localMax++;
				if (localMax === 4) {
					playerWins();
					return;
				}
			} else {
				localMax = 0;
			}
		}
	}

	//   check horizontally
	localMax = 0;
	for (var j = 0; j < maxCol; j++) {
		if (gridArray[currentRow][j] !== null) {
			//if empty, stop checking
			if (gridArray[currentRow][j] == currentPlayer) {
				localMax++;
				if (localMax === 4) {
					playerWins();
					return;
				}
			} else {
				localMax = 0;
			}
		}
	}
	checkDiagonalRight(currentRow, currentCol);
	checkDiagonalLeft(currentRow, currentCol);
}

function playerWins() {
	var winMessage = document.getElementById('win');
	winMessage.textContent = currentPlayer + ' player wins!';
	if (currentPlayer == 'Red') {
		winMessage.className = "red-text";
	} else {
		winMessage.className = "yellow-text";
	}
	document.getElementById('modalContainer').classList.remove('hidden');
	clearInterval(countdown);
}

function checkDiagonalRight(currentRow, currentCol) {
	var localMax = 0;
	var col = currentCol;
	while (currentRow !== 0 && col !== 0) {
		currentRow--;
		col--;
	}
	//console.log('current row is', currentRow);
	for (var k = currentRow; k < maxRow; k++) {
		//console.count(localMax);
		if (gridArray[k][col] !== null) {
			//if empty, stop checking
			if (gridArray[k][col] == currentPlayer) {
				localMax++;
				if (localMax === 4) {
					playerWins();
					return;
				}
			} else {
				localMax = 0;
			}
		}
		col++;
	} // bottom left to top right
}

function checkDiagonalLeft(currentRow, currentCol) {
	var localMax = 0;
	var col = currentCol;

	while (col !== maxCol && currentRow !== 0) {
		currentRow--;
		col++;
	}

	for (var k = currentRow; k < maxRow; k++) {
		if (gridArray[k][col] !== null) {
			//if empty, stop checking
			if (gridArray[k][col] == currentPlayer) {
				localMax++;
				if (localMax === 4) {
					playerWins();
					return;
				}
			} else {
				localMax = 0;
			}
		}
		col--;
	} // bottom right to top left
}

function resetGame() {
	currentPlayer = 'Red';
	document.getElementById("color").textContent = currentPlayer;
	document.getElementById("color").className="red-text";
	document.getElementById('error').textContent = '';
	for (var i = maxRow - 1; i >= 0; i--) {
		gridArray[i] = [];
		for (var j = 0; j < maxCol; j++) {
			//0,0 is bottom left

			gridArray[i][j] = null; //internal grid
		}
	}
	countdown = null;
	turnTime = 20;
	timer.textContent = 20;
	countdown = setInterval(handleTime, 1000);
	var tiles = container.children;
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].classList.remove('Red');
		tiles[i].classList.remove('Yellow');
	}
	document.getElementById('modalContainer').classList.add('hidden');
}

function switchPlayer(){
	var color = document.getElementById("color");
	if (currentPlayer == 'Red') {
		//change turn, first player is always Red
		currentPlayer = 'Yellow';
		color.className = "yellow-text";
	} else {
		currentPlayer = 'Red';
		color.className = "red-text";
	}
	color.textContent = currentPlayer;

}
