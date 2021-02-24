import './App.css';
import {useEffect, useState} from 'react';
import Board from './board';
import io from 'socket.io-client';


const socket = io();

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  function handleClick(i){
    const temp = [...board];
    temp[i] = 'X';
    setBoard(temp);
    const cc = Number(i);
    socket.emit('isPlay', cc);
  }
  
  useEffect(() => {
    socket.on('isPlay', (data) => {
      console.log('A move had been made at ' + (data+1));
      const temp1 = [...board];
      temp1[data] = 'X';
      setBoard(temp1);
    });
  }, [handleClick]);


  return (
    <div>
      <h1> Tic Tac Toe Board Game </h1>
      <Board squares={board} onClick={handleClick} />
    </div>
  );
}

export default App;
