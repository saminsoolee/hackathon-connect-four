var maxRow = 6;
var maxCol = 7; //max
var error = document.getElementById('error');
var currentPlayer;
var pokemonChoices = { Pikachu: 'yellow', Squirtle: 'blue', Charmander: 'red', Bulbasaur: 'green' };
var playerColor1;
var playerColor2;
var gridArray = [];
var container = document.querySelector('div.container');
var buttonContainer = document.querySelector('div.buttonContainer');
var reset = document.getElementById('reset');
var timer = document.querySelector('h1.time');
var turnTime = 20;
var players = [];
var playerNum = 0;
var player = document.getElementById('enter');
player.addEventListener('click', addPlayer);
reset.addEventListener('click', resetGame);

var countdown;
populate(); //sets the grid for the first time;

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

function populate() {
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
}

function addTile() {
	if (countdown != null) clearInterval(countdown);
	countdown = null;
	turnTime = 20;
	timer.textContent = 20;
	countdown = setInterval(handleTime, 1000);
	error.textContent = '';
	var currCol = event.currentTarget.getAttribute('col'); //maxCol
	for (var rowNum = 0; rowNum < maxCol; rowNum++) {
		// find the first empty row in the maxCol
		if (rowNum == 6) {
			error.textContent = 'This column is full, try again';
			return;
		}
		if (gridArray[rowNum][currCol] === null) {
			gridArray[rowNum][currCol] = currentPlayer;
			colorTile(rowNum, currCol);
			checkWin(rowNum, currCol);
			switchPlayer();
			break; // if value is assigned to tile, break out of loop
		}
	}
	return;
}

function colorTile(row, col) {
	var localRow = document.getElementsByClassName('row-' + row);
	var element = localRow[col];
	if (currentPlayer === players[0]) {
		element.classList.add(pokemonChoices[playerColor1]);
	} else {
		element.classList.add(pokemonChoices[playerColor2]);
	}
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
	winMessage.textContent = currentPlayer + ' wins!';
	if (currentPlayer == players[0]) {
		winMessage.className = pokemonChoices[playerColor1] + '-text';
	} else {
		winMessage.className = pokemonChoices[playerColor1] + '-text';
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
	currentPlayer = players[0];
	document.getElementById('color').textContent = currentPlayer;
	document.getElementById('color').className = pokemonChoices[playerColor1] + '-text';
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
		tiles[i].classList.remove(pokemonChoices[playerColor1]);
		tiles[i].classList.remove(pokemonChoices[playerColor2]);
	}
	document.getElementById('modalContainer').classList.add('hidden');
}

function switchPlayer() {
	var color = document.getElementById('color');
	if (currentPlayer == players[0]) {
		//change turn, first player is always Red
		currentPlayer = players[1];
		color.className = pokemonChoices[playerColor2] + '-text';
	} else {
		currentPlayer = players[0];
		color.className = pokemonChoices[playerColor1] + '-text';
	}
	color.textContent = currentPlayer;
}

function addPlayer() {
	if (playerNum < 2) {
		players.push(document.getElementById('name').value);
		var pokemon = document.getElementById('pokemon');
		if (playerNum === 0) {
			playerColor1 = pokemon.options[pokemon.selectedIndex].textContent;
			pokemon.remove(pokemon.selectedIndex);
		} else if (playerNum === 1) {
			playerColor2 = pokemon.options[pokemon.selectedIndex].textContent;
		}
		document.getElementById('name').value = '';
		document.getElementById('labelName').textContent = 'Player 2 Name:';
		playerNum++;
		if (playerNum === 2) {
			document.getElementById('playerContainer').classList.add('hidden');
			currentPlayer = players[0];
			color.className = pokemonChoices[playerColor1] + '-text';
			document.getElementById('color').textContent = currentPlayer;
			countdown = setInterval(handleTime, 1000);
		}
	} else {
		document.getElementById('playerContainer').classList.add('hidden');
	}
}
