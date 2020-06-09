var row = 6;
var column = 7;
var error = document.getElementById('error');
var currentPlayer = 'red'; //yellow
var gridArray = [];
var container = document.querySelector('div.container');
var buttonContainer = document.querySelector('div.buttonContainer');
//container.addEventListener('container');
for (var i = row - 1; i >= 0; i--) {
	gridArray[i] = [];
	for (var j = 0; j < column; j++) {
		//0,0 is bottom left
		var spot = document.createElement('div');
		spot.classList.add('col-' + j);
		spot.classList.add('row-' + i);
		spot.classList.add('spot');
		container.appendChild(spot);
		gridArray[i][j] = null; //internal grid
	}
}

for (var i = 0; i < column; i++) {
	var button = document.createElement('button');
	button.textContent = 'Add tile to column ' + i;
	button.setAttribute('col', i);
	button.addEventListener('click', addTile);
	buttonContainer.appendChild(button);
}

function addTile() {
	error.textContent = '';
	var currCol = event.currentTarget.getAttribute('col'); //column
	//console.log(event.currentTarget.ge//tAttribute('col'));
	for (var rowNum = 0; rowNum < column; rowNum++) {
		// find the first empty row in the column
		if (rowNum == 6) {
			error.textContent = 'Column is full, try again';
			return;
		}
		if (gridArray[rowNum][currCol] === null) {
			gridArray[rowNum][currCol] = currentPlayer;
			colorTile(rowNum, currCol);
			checkWin(rowNum, currCol);
			//if (checkWin(rowNum, currCol)){
			//    break;
			//}
			if (currentPlayer == 'red') {
				//change turn, first player is always red
				currentPlayer = 'yellow';
			} else {
				currentPlayer = 'red';
			}
			document.getElementById('currentPlayer').textContent = 'Current Player: ' + currentPlayer;
			break; // if value is assigned to tile, break out of loop
		}
	}
	return;
}

function colorTile(row, col) {
	var localRow = document.getElementsByClassName('row-' + row);
	var element = localRow[col];
	//console.log(element);
	element.classList.add(currentPlayer);
}

function checkWin(rownum, col) {
	var localMax = 0;
	var currentCol = col;
	var currentRow = rownum;

	// check vertically
	for (var i = 0; i < row; i++) {
		if (gridArray[i][currentCol] !== null) {
			//if empty, stop checking
			if (gridArray[i][currentCol] == currentPlayer) {
				localMax++;
				if (localMax === 4) {
					document.getElementById('error').textContent = currentPlayer + 'player wins!';
					return;
				}
			} else {
				localMax = 0;
			}
		}
	}

	//   check horizontally
	localMax = 0;
	for (var j = 0; j < column; j++) {
		if (gridArray[currentRow][j] !== null) {
			//if empty, stop checking
			if (gridArray[currentRow][j] == currentPlayer) {
				localMax++;
				if (localMax === 4) {
					document.getElementById('error').textContent = currentPlayer + 'player wins!';
					return;
				}
			} else {
				localMax = 0;
			}
		}
	}
	checkDiagonal(currentRow, currentCol);

	return;
}

function checkDiagonal(currentRow, currentCol) {
	var localMax = 0;
	for (var i = 0; i < currentCol; i++) {
		if (currentRow === 0) {
			break;
		}
		currentRow--;
	}
	console.log('current row is', currentRow);
	col = 0;
	for (var k = currentRow; k < row; k++) {
		if (gridArray[k][col] !== null) {
			//if empty, stop checking
			if (gridArray[k][col] == currentPlayer) {
				localMax++;
				col++;
				if (localMax === 4) {
					document.getElementById('error').textContent = currentPlayer + 'player wins!';
					return;
				}
			} else {
				localMax = 0;
				col++;
			}
		}
	} // bottom left to top right
}
