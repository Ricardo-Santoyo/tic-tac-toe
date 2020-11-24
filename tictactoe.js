const Gameboard = (() => {
  let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  function addMark() {
    let position = this.dataset.id;
    let mark;
    if (GameController.getTurnNumber() % 2 === 0) {
      mark = "X";
    } else {
      mark = "O";
    };
    if (gameboard[position] === " ") {
      gameboard[position] = mark;
      GameController.turn();
    };
  };

  function clickableSlots() {
    let i = 0;
    document.querySelectorAll(".slot").forEach(slot => {
      slot.dataset.id = i;
      slot.addEventListener("click", addMark);
      i++;
    });
  };
  clickableSlots();

  function display() {
    let i = 0;
    document.querySelectorAll(".slot").forEach(slot => {
      slot.textContent = gameboard[i];
      i++;
    });
    i = 0;
  };

  function getGameBoard() {
    return gameboard;
  };

  return {
    display,
    getGameBoard
  };
})();

const Player = (name) => {
  return {name};
};

const GameController = (() => {
  let turnNumber = 0;
  let header = document.querySelector("#header");
  let startGameButton = document.querySelector("#start-game-button");
  startGameButton.addEventListener("click", startGame);
  let Player1;
  let Player2;

  function startGame() {
    let board = document.querySelector("#board-container");
    board.style.display = "grid";
    let playerForms = document.querySelectorAll(".player-form");
    Player1 = Player(playerForms[0].name.value);
    if (Player1.name === "") {
      Player1.name = "Player1";
    };
    Player2 = Player(playerForms[1].name.value);
    if (Player2.name === "") {
      Player2.name = "Player2";
    };
    let playerFormContainer = document.querySelector("#player-form-container");
    playerFormContainer.remove();
    startGameButton.remove();
    changeHeader();
  };

  function getTurnNumber() {
    return turnNumber;
  };

  function changeHeader() {
    if (turnNumber % 2 === 0) {
        header.textContent = Player1.name + "'s Turn";
    } else {
        header.textContent = Player2.name + "'s Turn";
    }; 
  };

  function turn() {
    Gameboard.display();
    let win = checkForWin();
    if (win === true) {
      gameover();
    } else {
      turnNumber++;
      changeHeader();
    };

    if (turnNumber === 9) {
      gameover();
    };
  };

  function checkForWin() {
    const board = Gameboard.getGameBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    return winConditions.some(array => {
      let checkRow = [];
      array.forEach(id => {
        if (board[id] !== " ") {
          checkRow.push(board[id]);
        };
      });
  
      if (checkRow.length === 3) {
        if (checkRow.every(slot => slot === "X")) {
          return true;
        }
        else if (checkRow.every(slot => slot === "O")) {
          return true;
        };
      };
    });
  };

  function gameover() {
    let winner;
    if (turnNumber % 2 === 0) {
      winner = Player1;
    } else {
      winner = Player2;
    };
    let result = document.querySelector("#results");
    if (turnNumber === 9) {
      result.textContent = "It's a Tie!";
    } else {
      result.textContent = winner.name + " is the Winner!";
    };
    let gameoverCard = document.querySelector("#gameover-container");
    gameoverCard.style.display = "block";
    let replayButton = document.querySelector("#replay-button");
    replayButton.addEventListener('click', () => {
      window.location.reload();
    });
  };

  return {
    getTurnNumber,
    turn
  };
})();