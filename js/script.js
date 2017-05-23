var snake = {
	position: [20, 20],
	direction: "r",
	current_snake: [[20, 20]]
}

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
		$(".snake-grid").append("<div class='square' id='row-" + grid[index][0] + "-col-" + grid[index][1] + "'</div>");
		$("#row-20-col-20").html("O");
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
	console.log(snake.direction);	
}

function move() {
	switch (snake.direction) {
		case "l":
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("");
			snake.current_snake[0][1] = snake.current_snake[0][1] - 1; 
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("O");

			console.log(snake.current_snake);
			console.log("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]);
			break;		
		case "u":
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("");
			snake.current_snake[0][0] = snake.current_snake[0][0] - 1; 
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("O");
			break;
		case "r":
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("");
			snake.current_snake[0][1] = snake.current_snake[0][1] + 1; 
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("O");
			break;
		case "d":
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("");
			snake.current_snake[0][0] = snake.current_snake[0][0] + 1; 
			$("#row-" + snake.current_snake[0][0] + "-col-" + snake.current_snake[0][1]).html("O");
			break;
	} 
}	

function gameOver() {
	return false;
}

function gameLoop() {
	setTimeout(function run() {
		if (gameOver() === false) {
			move()
			gameLoop();
		}
	}, 250);

}

$(function() {
	render();
	
  $("html").on("keyup", function(e) {
    console.log(e);
    gameLoop();
    e.preventDefault();
    parseKey(e.keyCode);
  })
})