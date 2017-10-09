"use strict";

// Data
var turn1 = true,
    count = 0,
    isPlaying = false,
    mode = "",
    radios = document.getElementsByName('mode');

function getMode() {
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      mode = radios[i].value;
      break;
    }
  }
}

var rules = ["123", "456", "789", "147", "258", "369", "159", "357"];

var player1moves = "",
    player2moves = "",
    player1Name = "",
    player2Name = "",
    computerSymbol = "",
    playerSymbol = "",
    playerName = "",
    computerMoves = "",
    playerMoves = "";

//DOM
var symbols = document.getElementsByClassName("symbol"),
    symbolRadios = document.getElementsByName('symbol'),

//DOMs for getting value
result = document.getElementsByClassName("result")[0],
    hint = document.getElementsByClassName("hint")[0],
    player1 = document.getElementsByClassName("player1")[0],
    player2 = document.getElementsByClassName("player2")[0],
    singleName = document.getElementsByClassName("singleName")[0],

// phases
inputting = document.getElementById("inputting"),
    playing = document.getElementById("playing"),
    showingResult = document.getElementById("showingResult");

/*----------------------------------*/

// event handler

function clickHandle(event) {
  if (event.target.className == "symbol" && isPlaying == true) {
    if (mode == "multi") {
      // check who's isPlaying
      if (turn1) {
        //UI
        event.target.classList.add("circle");
        //Data
        player1moves += event.target.id;
        count += 1;
        //Check if player wins
        checkIfWins(player1moves, player1Name + " wins!");
      } else {
        event.target.classList.add("cross");
        player2moves += event.target.id;
        count += 1;
        checkIfWins(player2moves, player2Name + " wins!");
      }

      turn1 = !turn1;
      changeHint();
    } else if (mode == "single") {

      event.target.classList.add(playerSymbol);
      playerMoves += event.target.id;
      count += 1;

      checkIfWins(playerMoves, "You win!");
      turn1 = !turn1;
      changeHint();
      setTimeout(function () {
        computerPlays();
      }, 500);
    }
  }
}

/*---------------------------------*/
function initGame() {
  //UI
  [].forEach.call(symbols, function (symbol) {
    symbol.className = "symbol";
  });

  initData();

  inputting.checked = "true";
}

/*---------------------------------*/
//tools

function check(string) {

  var count = 0,
      i,
      j;

  rules.forEach(function (rule) {
    if (count == 3) return true;
    count = 0;
    for (i = 0; i < rule.length; i += 1) {
      for (j = 0; j < string.length; j += 1) {
        if (rule[i] == string[j]) {
          count += 1;
          // console.log(count);
          // if(count==3) return true;
        }
      }
    }
  });
  if (count == 3) return true;
  return false;
}
/*----------------------------------*/
function congratulate(string) {
  isPlaying = false;
  for (var i = string.length - 1; i >= 0; i -= 1) {
    var dom = document.createElement("span");
    dom.innerHTML = string[i];
    result.prepend(dom);
  }
  showingResult.checked = "true";
}

function initData() {
  player1moves = "";
  player2moves = "";
  player1Name = "Player1";
  player2Name = "Player2";

  playerName = "Player";
  playerSymbol = "";
  computerSymbol = "";
  playerMoves = "";
  computerMoves = "";

  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
  count = 0;
}

function submitHandle(e) {
  e.preventDefault();
  getMode();
  setData();

  playing.checked = "true";

  isPlaying = true;

  turn1 = true;
  changeHint();

  if (mode == "single" && computerSymbol == "circle") {
    computerPlays();
  }
}

function changeHint() {
  if (turn1) {
    hint.classList.add("circle");
    hint.classList.remove("cross");
  } else {
    hint.classList.add("cross");
    hint.classList.remove("circle");
  }
}

function computerPlays() {
  if (isPlaying == true) {
    var index = Math.floor(Math.random() * 9);
    if (symbols[index].className != "symbol") {
      computerPlays();
    } else {
      symbols[index].classList.add(computerSymbol);
      computerMoves += symbols[index].id;
      count += 1;
      checkIfWins(computerMoves, "Computer wins!");
      turn1 = !turn1;
      changeHint();
    }
  }
}

function setData() {
  if (mode == "single") {
    playerName = singleName.value || "Player";
    getSymbol();
    if (playerSymbol == "circle") computerSymbol = "cross";else computerSymbol = "circle";
  } else if (mode == "multi") {
    player1Name = player1.value || "Player1";
    player2Name = player2.value || "Player2";
  }
}

function getSymbol() {
  for (var i = 0, length = symbolRadios.length; i < length; i++) {
    if (symbolRadios[i].checked) {
      playerSymbol = symbolRadios[i].value;
      break;
    }
  }
}

function checkIfWins(moves, words) {
  if (check(moves) == true) {
    congratulate(words);
    return;
  }

  if (count == 9) {
    congratulate("Draw!");
    //showingResult.checked = "true";
  }
}

// main
initGame();