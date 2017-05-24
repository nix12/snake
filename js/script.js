var snake = {
	position: [20, 20],
	direction: "r",
	current_snake: [[20, 20]]
}

var food = {
	position: [10, 4]
}

var gameSpeed = 250;

function createGrid() {
	var grid = [];

	for (var row = 0; row < 40; row++) {
		for (var column = 0; column < 40; column++) {
			grid.push([row, column]);
		}
	}

	return grid;
}

function render() {
	var grid = createGrid();

	$.map(grid, function(variable, index) {
		$(".snake-grid").append("<div class='square' id='row-" + grid[index][0] + 
														"-col-" + grid[index][1] + "'</div>");
		$("#row-20-col-20").addClass("snake");
		$("#row-10-col-4").addClass("food");
	})
}

function parseKey(key) {
	console.log(key);
	switch (key) {
		case 37:
			snake.direction = "l";
      break;
		case 38:
			snake.direction = "u";
      break;
		case 39:
			snake.direction = "r";
      break;
		case 40:
			snake.direction = "d";
      break;
	}	
}

function move() {
	for (var i = 0; i < snake.current_snake.length; i++) {
		switch (snake.direction) {
			case "l":
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).removeClass("snake");
				snake.current_snake[i][1] = snake.current_snake[i][1] - 1; 
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).addClass("snake");
				break;		
			case "u":
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).removeClass("snake");
				snake.current_snake[i][0] = snake.current_snake[i][0] - 1; 
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).addClass("snake");
				break;
			case "r":
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).removeClass("snake");
				snake.current_snake[i][1] = snake.current_snake[i][1] + 1; 
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).addClass("snake");
				break;
			case "d":
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).removeClass("snake");
				snake.current_snake[i][0] = snake.current_snake[i][0] + 1; 
				$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).addClass("snake");
				break;
		} 
	}
}	

function createFood() {
	food.position[0] = Math.floor(Math.random() * (40 - 0)) + 0;
	food.position[1] = Math.floor(Math.random() * (40 - 0)) + 0;
	$("#row-" + food.position[0] + "-col-" + food.position[1]).addClass("food");

	console.log(food.position);
}

function collisionDetection() {
	for (var i = 0; i < snake.current_snake.length; i++) {
		if (JSON.stringify(snake.current_snake[i]) ===
				JSON.stringify(i)) {
			return true
		}
	}
}

function gameOver() {
	if (snake.current_snake[0][0] > 39 || snake.current_snake[0][0] < 0 ||
			snake.current_snake[0][1] > 39 || snake.current_snake[0][1] < 0) {
		alert("Game Over");
		return true;
	} else if (collisionDetection() === true) {

	} else {
		return false;
	}
}

function gameLoop() {
	setTimeout(function run() {
		if (gameOver() === false) {

			move();

			if (eatFood() === true) {
				createFood();
			}
			
			
			// gameLoop();
		}
	}, gameSpeed);

}

function eatFood() {
	// console.log("food: " + food.position)
	// console.log("snake position: " + snake.current_snake[0])
	if (JSON.stringify(snake.current_snake[0]) === JSON.stringify(food.position)) {
		var coord;

		switch(snake.direction) {
			case "l":
				coord = [snake.current_snake[0][0], snake.current_snake[0][1] - 1];
				break;
			case "u":
				coord = [snake.current_snake[0][0] - 1, snake.current_snake[0][1]];
				break;				
			case "r":
				coord = [snake.current_snake[0][0], snake.current_snake[0][1] + 1];
				break;
			case "d":
				coord = [snake.current_snake[0][0] + 1, snake.current_snake[0][1]];
				break;
		}

		snake.current_snake.unshift(coord);
		$("#row-" + food.position[0] + "-col-" + food.position[1]).removeClass("food");
		console.log(food.position);

		return true;
		// for (var i = 0; i < snake.current_snake.length; i++)
		// 	switch(snake.direction) {
		// 		case "l":
		// 			$("#row-" + snake.current_snake[i][0] + "-col-" + snake.current_snake[i][1]).addClass("snake");

		// 	}
	}
}

$(function() {
	render();
	// gameLoop();

  $("html").on("keyup", function(e) {
  	gameLoop(); 
    e.preventDefault();
    parseKey(e.keyCode);
  })
})