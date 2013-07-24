var snake = {
  snake: [[5, 5], [5, 4], [5, 3]],
  direction: "east",
  turn: function(dir){
    this.direction = dir;
  }
};

var boardArr = [];
for (var i = 0; i < 10; i++) {
  var row = [];
  for (var j = 0; j < 10; j++) {
    row.push(" ");
  };
  boardArr.push(row);
};

var board = {
  board: boardArr
};

var genApple = function () {
  var y = Math.floor(Math.random() * 10),
      x = Math.floor(Math.random() * 10);

  if (board.board[y][x] === " "){
    board.board[y][x] = "a";
  }
  else{
    genApple();
  }
};

genApple();

var game = {
  step: function () {
    var head = snake.snake[0];

    switch(snake.direction){
      case "east":
        var newHead = [head[0], head[1] + 1];
        break;
      case "west":
        var newHead = [head[0], head[1] - 1];
        break;
      case "north":
        var newHead = [head[0] - 1, head[1]];
        break;
      case "south":
        var newHead = [head[0] + 1, head[1]];
        break;
    }

    var y = newHead[0],
        x = newHead[1];

    if (board.board[y][x] === "a") {
      snake.snake.unshift(newHead);
      updateBoard();
      genApple();
    }
    else if (board.board[y][x] !== " " || board.board[y][x] === undefined) {
      console.log("Game over!");
    }
    else {
      snake.snake.pop();
      snake.snake.unshift(newHead);
      updateBoard();
    }
  }
};

var updateBoard = function () {
  for (var i = 0; i < board.board.length; i++) {
    for (var j = 0; j < board.board[i].length; j++) {
      if (board.board[i][j] !== "a"){
        board.board[i][j] = " ";
      }
    }
  };
  snake.snake.forEach(function(el2, j, arr2) {
    board.board[el2[0]][el2[1]] = "o";
  })
};


// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// console.log(board.board);
// console.log(snake.snake);
// snake.turn("west");
// game.step();
// console.log(board.board);
// console.log(snake.snake);
