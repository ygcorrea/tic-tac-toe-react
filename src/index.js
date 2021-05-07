import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function TicTactoe() {
  const emptyBoard = Array(9).fill('')
  const [board, setBoard] = useState(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [winner, setWinner] = useState(null)

  const checkWinner = () => {

    const waysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    waysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O")
      if (cells.every(cell => cell === "X")) setWinner("X")
    });

  }
  
  const checkDraw = () => {
    if(board.every(item => item !== "")) setWinner("Draw")
  }
  checkDraw();
  
  useEffect(checkWinner, [board]);

const resetGame = () =>{
  setCurrentPlayer("X");
  setBoard(emptyBoard);
  setWinner(null)
}

  const handleCellClick = (index) => {

    if (board[index] !== "") {
      console.log("Position busy")
      return null
    }
    if (winner) {
      console.log("The game is over")
      return null
    }

    setBoard(board.map((item, itemIndex) =>
      itemIndex === index ? currentPlayer : item))
    setCurrentPlayer(currentPlayer === 'X' ? "O" : "X");
  }


  return (
    <>
      <h1 className="title">Tic Tac Toe</h1>
      <div className={`board ${winner ? 'game-over' : ''}`}>
        {board.map((item, index) => (
          <div
            onClick={() => handleCellClick(index)}
            key={index}
            className={`cell ${item}`}>
            {item}
          </div>
        ))}
      </div>
      {winner &&
      <footer>
        {winner === "Draw" ?
        <h2 className="winner-message">
          <span className={winner}>DRAW!</span>
        </h2>
        :
        <h2 className="winner-message">
          <span className={winner}>{winner}</span> ganhou
        </h2>
        }
        <button onClick={resetGame}>Reset Game</button>
      </footer>
      }
    </>
  )
}

export default TicTactoe;
ReactDOM.render(<TicTactoe />, document.getElementById('root'))