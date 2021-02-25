import './App.css';
import {useEffect, useState} from 'react';
import Board from './Board';
import io from 'socket.io-client';
import {calculateWinner} from './helper';


const socket = io();

const styles = {
    width: '200px',
    margin: '20px auto',
};

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  
  function handleClick(i){
    const boardCopy = [...board];
    if(winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXisNext(!xIsNext);
    const cc = Number(i);
    socket.emit('isPlay', cc);
  }
  
  function renderMoves(){
    return(
        <button onClick={() => setBoard(Array(9).fill(null))}>
            Start Game
        </button>
      );
  }
  
  useEffect(() => {
    socket.on('isPlay', (data) => {
      console.log('A move had been made at ' + (data+1));
      const boardCopy = [...board];
      if(winner || boardCopy[data]) return;
      boardCopy[data] = xIsNext ? 'X' : 'O';
      setBoard(boardCopy);
      setXisNext(!xIsNext);
    });
  }, [handleClick]);


    return (
        <>
            <Board squares={board} onClick={handleClick} />
            <div style={styles}>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                  {renderMoves()}
            </div>
        </>
    )
}

export default App;
