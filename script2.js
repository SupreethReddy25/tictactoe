const Gameboard=(function(){

    let gameboard=['.','.','.','.','.','.','.','.','.'];

    const getBoard=()=>gameboard;

    const addMarker=(idx,marker)=>{
        if(gameboard[idx]==='.'){
            gameboard[idx]=marker;
            return true;
        }
        else{
            return false;
        }
    };
    const resetBoard=()=>{
        gameboard=['.','.','.','.','.','.','.','.','.'];
    };
    return {getBoard,addMarker,resetBoard};
})();

const createPlayer=(name,marker) =>{
    return {name,marker};
};

const GameController=(function(){
    const players=[createPlayer("Supreeth","X"),createPlayer("Reddy","O")];
    let activePlayer=players[0];
    const switchPlayers=()=>{
        activePlayer=(activePlayer===players[0])?players[1]:players[0];
    };

    const detectWin=()=>{
        const winningConditions=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[2,5,8],[1,4,7],
        [0,4,8],[2,4,6]
    ];
    const board=Gameboard.getBoard();
    for(let i=0;i<winningConditions.length;i++){
        const pos1=winningConditions[i][0];
        const pos2=winningConditions[i][1]; 
        const pos3=winningConditions[i][2];

        if(board[pos1]!=='.' && board[pos1]===board[pos2] && board[pos2]===board[pos3]){
            return board[pos1];
        }}
        if(!board.includes('.')){return "tie";}
    return null;
    };

    const displayBoard=()=>{
        console.log('\n--- Current Board ---');
        const board = Gameboard.getBoard();
        for (let i = 0; i < 9; i += 3) {
            console.log(board.slice(i, i + 3).join(' | '));
        }
        console.log('---------------------\n');
    };

    const playGame=()=>{
        let gameResult=null;
        while(gameResult===null){
            displayBoard();
            
            let move=prompt(`${activePlayer.name}, it's your move [0-8]`);
            let moveIdx=parseInt(move,10);
            while (isNaN(moveIdx) || moveIdx < 0 || moveIdx > 8 || !Gameboard.addMarker(moveIdx, activePlayer.marker)) {
                alert('Invalid move! The spot might be taken or your input is wrong. Please try again.');
                move = prompt(`Player ${activePlayer.name}, enter your move (0-8):`);
                moveIdx = parseInt(move, 10);
            }
            gameResult=detectWin();
            if(gameResult===null){
                switchPlayers();
            }
        }
        displayBoard();
        if(gameResult==='tie'){
            console.log("It's a TIE !");
            alert("It's a TIE !");
        }else{
            console.log(`---- ${activePlayer.name} ---- is the winner !`);
            alert(`---- ${activePlayer.name} ---- is the winner !`);
        }
    }
    return {playGame};
})();

GameController.playGame();