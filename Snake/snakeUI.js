// Up: Keycode 38
// Down: Keycode 40
// Left: Keycode 37
// Right: Keycode 39

$(document).ready(function(){
  board.board.forEach(function(row, i, arr) {
    $("body").append("<ul id=r" + i + "></ul>");
    var liHtml = "";

    row.forEach(function(el, j, arr2) {
      if (el === "o") {
        liHtml += "<li id='c" + j + "' class='snake'></li>"
      }
      else if (el === "a") {
        liHtml += "<li id='c" + j + "' class='apple'></li>"
      }
      else {
        liHtml += "<li id='c" + j + "'></li>"
      }
    })

    $("#r" + i).append(liHtml);
  })
});

var run_loop = function () {
  $('html').keydown(function(event){
    if (event.keyCode === 38 && (snake.direction === "east" || snake.direction === "west")){
      snake.turn("north");
    }
    else if (event.keyCode === 40 && (snake.direction === "east" || snake.direction === "west")){
      snake.turn("south");
    }
    else if (event.keyCode === 37 && (snake.direction === "north" || snake.direction === "south")){
      snake.turn("west");
    }
    else if (event.keyCode === 39 && (snake.direction === "north" || snake.direction === "south")){
      snake.turn("east");
    }
  });

  game.step();
  if (gameOver()){
    alert("Game over!");
    window.clearInterval(timer);
  }
  clearBoard();
  renderBoard();
}

var gameOver = function () {
  head = snake.snake[0];

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

  console.log(head);

  var x = newHead[0],
      y = newHead[1];

  if (head[0] < 0 || head[0] >= board.board[0].length){
    return true;
  }
  // else if (board.board[head[0]] === undefined){
  //   return true;
  // }
  else if (board.board[head[0]][head[1]] === undefined) {
    return true;
  }
  else if ((board.board[x][y] !== " " && board.board[x][y] !== "a")) {
    return true;
  }
  return false;
};

var clearBoard = function () {
  $('li').removeClass();
};

var renderBoard = function () {
  snake.snake.forEach(function(el2, k, arr2) {
    board.board[el2[0]][el2[1]] = "o";
  })

  board.board.forEach(function(row, i, arr) {
    row.forEach(function(el, j, arr2){
      var tmp = "#r" + i + "> #c" + j
      var cls = $(tmp).attr("class")

      if (el === "o"){
        $(tmp).addClass("snake");
      }
      else if (el === "a"){
        $(tmp).addClass("apple");
      }
    })
  })
};

var timer = window.setInterval(run_loop, 100);

