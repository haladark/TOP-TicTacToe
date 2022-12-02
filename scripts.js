
/* "use strict"; */

/* const gameBoard = (()=>{ //module
  const boardArr = ['x','o','x','x','x','o','o','o','x'];

  const displayBoard = ()=>{
   
    let removeBoard = document.querySelector('.board');
    if(document.body.contains(removeBoard)){
    removeBoard.remove();} // clear board for each input

    const container = document.querySelector('.container');
    let board = document.createElement('div');
    board.classList.add('board');
    container.appendChild(board);
    board = document.querySelector('.board');
    
    boardArr.forEach((sign, idx) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText=sign;
      board.appendChild(cell);})
    
  }
  const clearBoard = () => {
    for(let i in boardArr){
      boardArr[i]="";
      displayBoard();
    }
  }
  return{displayBoard, clearBoard};
})(); */


const gameBoard = (()=>{ // module pattern

  const boardArr = ['','','','','','','','',''];
  const setCell = (index, sign) => {
    if (index > boardArr.length) return;
    boardArr[index] = sign;
  };

  const getCell = (index) => {
    if (index > boardArr.length) return;
    return boardArr[index];
  };

  const reset = () => {
    for(let i in boardArr){
      boardArr[i]="";}
  }

  return {setCell, getCell, reset}
})();

const Player = (sign)=>{ //factory
  sign;
  
  const getSign = () =>{
    return sign;
  }

  return {getSign};

}


const displayControl = (() => { //module pattern

  const status = document.querySelector('.status');
  const cells = document.querySelectorAll('.cell');
  const restartBtn = document.getElementById('restart-btn');

  cells.forEach((cell)=>
    cell.addEventListener('click', (e) => {
      if(gameControl.getIsGameOver() || e.target.innerText !=="") return;
      gameControl.playRound(parseInt(e.target.dataset.index));
      updateGame();

    })
  );

  restartBtn.addEventListener('click', (e) =>{
    gameBoard.reset();
    gameControl.reset();
    updateGame();
    setStatus(false,'X');
  });

  const updateGame = () =>{
    for ( let i in cells){
      cells[i].textContent = gameBoard.getCell(i);
    }
  };

  const setStatus = (isOver,winner)=>{
    if(isOver){
      if ( winner === "draw") {
        message = "It's a draw!";
      }else {
        message = `Player ${winner} won!`;
      }
   }else {
    message = `Player ${winner} turn`;}

    status.textContent = message;
  } // modify for draw condition
 

  return{updateGame, setStatus};

})();

const gameControl = (()=>{ //Module Pattern
  
  const playerX = Player('X');
  const playerO = Player('O');
  var round = 1;
  var gameOver =false;

    const playRound = (idx)=>{
      gameBoard.setCell(idx,getPlayerSign());
      if (checkWinner(idx)) {
        gameOver=true;
        displayControl.setStatus(gameOver,getPlayerSign());
        return;
      }
      if (round >8){
        gameOver = true;
        displayControl.setStatus(gameOver,"draw");
        return;
      }
      round++;
      displayControl.setStatus(gameOver,getPlayerSign());
      

    }

    const getPlayerSign = ()=>{
      let sign = round % 2; /* === 1 ? playerX.getSign() : playerO.getSign(); */
      if(sign ===1){
        return playerX.getSign();
      }else {
        return playerO.getSign();
      }
    }

    const checkWinner = (idx)=>{
        const winCombinations = [
          [0,1,2],[3,4,5],[6,7,8],
          [0,3,6],[1,4,7],[2,5,8],
          [0,4,8],[2,4,6]
        ];
        
        return winCombinations
        .filter((combination) => combination.includes(idx))
        .some((possibleCombination) => possibleCombination.every(
            (idx) => gameBoard.getCell(idx) === getPlayerSign()
          )
        );
    }
    const reset = () => {
      round = 1;
      gameOver = false;
    };
    const getIsGameOver = ()=>{
      return gameOver;
    }

    return {playRound,reset,getIsGameOver};
})();

