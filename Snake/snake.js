var snake = {
  snake: [[9, 10], [9, 9], [9, 8]],
  direction: "east",
  turn: function(dir){
    this.direction = dir;
  }
};

var boardArr = [];
for (var i = 0; i < 30; i++) {
  var row = [];
  for (var j = 0; j < 30; j++) {
    row.push(" ");
  };
  boardArr.push(row);
};

var board = {
  board: boardArr
};

var genApple = function () {

  var x = Math.floor(Math.random() * board.board.length),
      y = Math.floor(Math.random() * board.board.length);

  if (board.board[x][y] === " "){
    board.board[x][y] = "a";
  }
  else{
    genApple();
  }
};

var updateBoard = function () {
  for (var i = 0; i < board.board.length; i++) {
    for (var j = 0; j < board.board.length; j++) {
      if (board.board[i][j] !== "a"){
        board.board[i][j] = " ";
      }
    }
  };
  snake.snake.forEach(function(el2, j, arr2) {
    board.board[el2[0]][el2[1]] = "o";
  })
};

updateBoard();
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

    var x = newHead[0],
        y = newHead[1];

    if (head[0] === 0 || head[0] === board.board.length - 1 || head[1] === 0 || head[1] === board.board.length[0] - 1){
      if (board.board[head[0]][head[1]] !== "a") {
        snake.snake.pop();
      }
      else {
        genApple();
      }
      snake.snake.unshift(newHead);
    }
    else if ((head[0] < 0 || head[0] >= board.board[0].length) || (head[1] < 0 || head[1] >= board.board.length)) {
      return;
    }
    else if (board.board[x][y] === "a") {
      snake.snake.unshift(newHead);
      updateBoard();
      genApple();
    }
    else {
      snake.snake.pop();
      snake.snake.unshift(newHead);
      updateBoard();
    }
  }
};
