const Gameboard=(function(){

    let gameboard=['','','','','','','','',''];

    const getBoard=()=>gameboard;

    const addMarker=(idx,marker)=>{
        if(gameboard[idx]===''){
            gameboard[idx]=marker;
            return true;
        }
        else{
            return false;
        }
    };
    const resetBoard=()=>{
        gameboard=['','','','','','','','',''];
    };
    return {getBoard,addMarker,resetBoard};
})();

const createPlayer=(name,marker) =>{
    return {name,marker};
};

const GameController=(function(){
    const players=[createPlayer("Supreeth","X"),createPlayer("Reddy","O")];
    let activePlayer=players[0];
    let gameOver=false;
    const switchPlayers=()=>{
        activePlayer=(activePlayer===players[0])?players[1]:players[0];
    };
    const getActivePlayer=()=>activePlayer;
    const detectWin=()=>{
        const winningConditions=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    const board=Gameboard.getBoard();
    for(let i=0;i<winningConditions.length;i++){
        const pos1=winningConditions[i][0];
        const pos2=winningConditions[i][1]; 
        const pos3=winningConditions[i][2];

        if(board[pos1]!=='' && board[pos1]===board[pos2] && board[pos2]===board[pos3]){
            gameOver=true;
            return {result:'win',winner: activePlayer};
        }
    }
    if(!board.includes('')){gameOver=true;
            return {result:'tie'};
        }
    return null;
    };  

    const playRound=(index)=>{
        if(gameOver) return;
        if(Gameboard.addMarker(index,activePlayer.marker)){
            const gameResult=detectWin();
            if(!gameResult){switchPlayers();}
            return gameResult;
        }
        return null;
    }
    const isGameOver = () => gameOver;

    const resetGame=()=>{
        Gameboard.resetBoard();
        activePlayer=players[0];
        gameOver=false;
    };
    return {playRound,getActivePlayer,resetGame,isGameOver};
})();

const DisplayController=(function(){
    const gameContainer=document.getElementById('game-container');
    const statusDisplay=document.getElementById('status-display');
    const restartButton=document.getElementById('restart-button');

    const renderBoard=()=>{
        const board=Gameboard.getBoard();

        gameContainer.innerHTML="";

        board.forEach((cellValue,index)=>{
            const square=document.createElement('div');
            square.classList.add('square');
            square.dataset.index=index;
            square.textContent=cellValue;
            gameContainer.appendChild(square);
        });
    };
    const updateStatus=(message)=>{
        statusDisplay.textContent=message;
    };

    const handleBoardClick=(e)=>{
        if (GameController.isGameOver()) return;
        
        const clickedIdx=e.target.dataset.index;

        if(clickedIdx!==undefined){
            const gameResult=GameController.playRound(clickedIdx);
            renderBoard();

            if(gameResult){
                if(gameResult.result==='win'){
                    updateStatus(`The Great ${gameResult.winner.name} wins!`);
                }else if (gameResult.result === 'tie') {
                    updateStatus("It's a Tie!");
                }
            }else{
                updateStatus(`${GameController.getActivePlayer().name}'s turn`);
            }
        }
    };

    const handleRestartClick=()=>{
        GameController.resetGame();
        renderBoard();
        updateStatus(`${GameController.getActivePlayer().name}'s turn`);
    };

    gameContainer.addEventListener('click',handleBoardClick);
    restartButton.addEventListener('click',handleRestartClick);

    renderBoard();
    updateStatus(`${GameController.getActivePlayer().name}'s turn`);


})();   