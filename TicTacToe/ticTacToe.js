var ticTacToe = function () {
  var board = [[" "," "," "],[" "," "," "],[" "," "," "]];
  var currentPlayer = "X";
  $('h1').after("<h3>" + currentPlayer + "'s turn</h3>")

  var gameOver = function () {
    if (vert() || horiz() || diag()){
      console.log("vert: " + vert());
      console.log("horiz: " + horiz());
      console.log("diag: " + diag());
      alert("Winner: " + vert() || horiz() || diag());
      return true;
    }
    else if (availMoves().length === 0) {
      alert("CAT'S GAME")
      return true;
    }
    return false;
  };

  var vert = function(){
    for (var col = 0; col < 3; col++) {
      var xCounter = 0;
      var oCounter = 0;
      for(var row = 0; row < 3; row++) {
        if (board[row][col] === "X"){
          xCounter += 1;
        }
        else if (board[row][col] === "O") {
          oCounter += 1;
        }
      }
      if (xCounter === 3){
        return "X";
      }
      else if (oCounter === 3){
        return "O";
      }
    }
    return false;
  };

  var horiz = function(){
    for (var row = 0; row < 3; row++){
      if (board[row][0] === board[row][1] && board[row][1] === board[row][2]){
        if (board[row][0] === "X" || board[row][0] === "O"){
          return board[row][0];
        }
      }
    }
    return false;
  };

  var diag = function(){
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
      if (board[0][0] === "X" || board[0][0] === "O"){
        return board[0][0];
      }
    }
    else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]){
      if (board[0][2] === "X" || board[0][2] === "O"){
        return board[0][2];
      }
    }
    return false;
  };

  var makeMove = function() {
    $('td').click(function(){
      $(this).text(currentPlayer);
      var $id = $(this).attr('id');
      var y = $id.substring(1,2),
          x = $id.substring(3,4);
      board[y][x] = currentPlayer;
      switchPlayer();
      if (gameOver()){
        return;      
      }
    });
  };

  var switchPlayer = function () {
    (currentPlayer === "X") ? currentPlayer = "O" : currentPlayer = "X";
    $('h3').text(currentPlayer + "'s turn");
  }

  var availMoves = function(){
    var moves = [];
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if(board[row][col] === " "){
          moves.push([row,col]);
        }
      }
    }
    return moves;
  };

  makeMove()
}

$(document).ready(function(){
  ticTacToe();  
});

