

function Gameboard () {
    let board = [];
    let gameActive = true;
    let currentPlayer = 'x';

    const winConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Left-to-right diagonal
        [2, 4, 6],  // Right-to-left diagonal
    ];

    function winnerOrDraw (result) {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                if (board[a] === 'x') {
                    result.innerText = 'result: win X'
                    gameActive = false;
                    return 
                }
                if (board[a] === 'o') {
                    result.innerText = 'result: win O'
                    gameActive = false;
                    return 
                }
            }
        }
        let roundDraw = !board.includes(undefined);
        if (roundDraw && board.length == 9) {
            result.innerText = 'result: draw'
            gameActive = false;
            return 
        }
    }

    function btnClick (bthArgument, result) {

        let btnIndex = bthArgument.target.id - 1;
        if (board[btnIndex] !== undefined || !gameActive) {
            return;
        }
        bthArgument.target.innerText = currentPlayer;
        board[btnIndex] = currentPlayer;
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        winnerOrDraw(result);
        
    }

    function restartGame (buttons, result) {
        buttons.forEach(btn => {
            btn.innerText = '';
        });
        result.innerText = 'result: '
        gameActive = true;
        board = [];
    }

    return {board, gameActive, btnClick, restartGame}
}

function eventClicks () {
    let game = Gameboard();
    let buttons = document.querySelectorAll('.button-board');
    let btnRestart = document.querySelector('.restart');
    let result = document.querySelector('.result');

    buttons.forEach(btn => {
        btn.addEventListener('click', (button) => {
            game.btnClick(button, result)
        })
    })

    btnRestart.addEventListener('click', () => {
        game.restartGame(buttons, result);
    })
}

eventClicks();




