function GameModal () {
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

    return {
        board,
        gameActive,
        currentPlayer,
        winConditions
    }
}

function GameModelController () {
    let gameModal = GameModal();

    function winnerOrDraw (bthArgument, result) {
        let btnIndex = bthArgument.target.id - 1;
        if (gameModal.board[btnIndex] !== undefined || !gameModal.gameActive) {
            return;
        }
        bthArgument.target.innerText = gameModal.currentPlayer;
        gameModal.board[btnIndex] = gameModal.currentPlayer;
        gameModal.currentPlayer = gameModal.currentPlayer === 'x' ? 'o' : 'x';

        for (let i = 0; i < gameModal.winConditions.length; i++) {
            const [a, b, c] = gameModal.winConditions[i];
            if (gameModal.board[a] && gameModal.board[a] === gameModal.board[b] && gameModal.board[a] === gameModal.board[c]) {
                if (gameModal.board[a] === 'x') {
                    result.innerText = 'result: win X'
                    gameModal.gameActive = false;
                    return 
                }
                if (gameModal.board[a] === 'o') {
                    result.innerText = 'result: win O'
                    gameModal.gameActive = false;
                    return 
                }
            }
        }
        let roundDraw = !gameModal.board.includes(undefined);
        if (roundDraw && gameModal.board.length == 9) {
            result.innerText = 'result: draw'
            gameModal.gameActive = false;
            return 
        }
    }

    function restartGame (buttons, result) {
        buttons.forEach(btn => {
            btn.innerText = '';
        });
        result.innerText = 'result: '
        gameModal.gameActive = true;
        gameModal.board = [];
    }

    return {
        restartGame,
        winnerOrDraw
    }
}

function GameModelView () {
    let gameModelController = GameModelController();

    let buttons = document.querySelectorAll('.button-board');
    let btnRestart = document.querySelector('.restart');
    let result = document.querySelector('.result');

    function btnClick () {
        buttons.forEach(btn => {
            btn.addEventListener('click', (button) => {
                gameModelController.winnerOrDraw(button, result)
            })
        })
    
        btnRestart.addEventListener('click', () => {
            gameModelController.restartGame(buttons, result);
        })
    }
    return {btnClick}
}


(function runApp () {
    try {
        const game = GameModelView();
        game.btnClick();
    } catch (error) {
        console.error(error);
    }
})();







/* function Gameboard () {
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

eventClicks(); */

