
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
    board[index] = sign;
  };

  const getCell = (index) => {
    if (index > boardArr.length) return;
    return board[index];
  };

  const resetBoard = () => {
    for(let i in boardArr){
      boardArr[i]="";}
  }

  return {setCell, getCell, resetBoard}
})();


const players = { //factory

}

const gameControl = (() => { //module





})();

