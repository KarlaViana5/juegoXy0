const board = document.getElementById('board');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const turnInfo = document.getElementById('turnInfo');
    const welcomeScreen = document.getElementById('welcomeWrapper');
    const gameScreen = document.getElementById('gameScreen');
    const resultMessage = document.getElementById('resultMessage');

    let gameBoard = Array(9).fill(null);
    let player = '';
    let currentTurn = '';
    let score = { X: 0, O: 0 };

    function selectPlayer(choice) {
      player = choice;
      currentTurn = 'X';
      welcomeScreen.classList.add('d-none');
      gameScreen.classList.remove('d-none');
      turnInfo.textContent = `Turno de: ${currentTurn === 'X' ? '✖️' : '⭕'}`;
      createBoard();
    }

    function createBoard() {
      board.innerHTML = '';
      gameBoard = Array(9).fill(null);

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', handleMove);
        board.appendChild(cell);
      }
    }

    function handleMove(e) {
      const index = e.target.dataset.index;
      if (gameBoard[index] || checkWinner('X') || checkWinner('O')) return;

      gameBoard[index] = currentTurn;
      e.target.innerHTML = currentTurn === 'X' ? '✖️' : '⭕';
      e.target.classList.add(currentTurn.toLowerCase());

      if (checkWinner(currentTurn)) {
        score[currentTurn]++;
        updateScore();
        showModal(`${currentTurn === 'X' ? '✖️' : '⭕'} ganó la partida 🎉`);
        createBoard();
      } else if (!gameBoard.includes(null)) {
        showModal("¡Empate 🤝!");
        createBoard();
      } else {
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
        turnInfo.textContent = `Turno de: ${currentTurn === 'X' ? '✖️' : '⭕'}`;
      }
    }

    function checkWinner(player) {
      const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      return wins.some(combo => combo.every(i => gameBoard[i] === player));
    }

    function updateScore() {
      scoreX.textContent = score.X;
      scoreO.textContent = score.O;
    }

    function resetGame() {
      currentTurn = 'X';
      createBoard();
      turnInfo.textContent = `Turno de: ${currentTurn === 'X' ? '✖️' : '⭕'}`;
    }

    function resetAll() {
      score = { X: 0, O: 0 };
      updateScore();
      welcomeScreen.classList.remove('d-none');
      gameScreen.classList.add('d-none');
      board.innerHTML = '';
    }

    function showModal(message) {
      resultMessage.innerHTML = message;
      const modal = new bootstrap.Modal(document.getElementById('resultModal'));
      modal.show();
    }