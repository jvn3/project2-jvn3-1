import './App.css';
import {useEffect, useState, useRef} from 'react';
import Board from './Board';
import io from 'socket.io-client';
import {calculateWinner} from './helper';
import {chatBox} from './ChatBox';
import {PopLogIn} from './LogIn';
import { Button, ButtonToolbar} from 'react-bootstrap';
import {userList} from './userList'
const socket = io();
const styles = {
    width: '200px',
    margin: '20px auto',
};

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const [user, setUser] = useState([]);
  const inputRef = useRef(null);
  const userName = useRef(null);
  const [messages, setMessages] = useState([]);
  const [modalShow, setModalShow] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [name, setName] = useState([]);
//  const [ID, setID] = useState([0]);
  var counter = 0;
 const [localName, setLocalName] = useState([]);   // local name of user 
  const addModalClose = () => setModalShow=false;
  
  

  
  function onClickButton(){
    if (inputRef != null){
      const message = name + ': ' + inputRef.current.value;
      setMessages(prevMessages => [...prevMessages, message]);
      socket.emit('chat', {message: message});
    }
  }
  
  function fetchUserName(){
    if(userName != null){
      const user_name = userName.current.value;
      setName(prevName => [...prevName, user_name]);
      setLocalName(prevLocalName => [...prevLocalName, user_name]);
      setModalIsOpen(false)
      counter = counter + 1;
      socket.emit('logIn', {user_name});
    }
  }
  
    function handleClick(i){
    
    if(localName[0] == name[0] || localName[0] == name[1]){
      if(localName[0] == name[0] && xIsNext){
      const boardCopy = [...board];
      if(winner || boardCopy[i]) return;
        boardCopy[i] = xIsNext ? 'X' : 'O';
        setBoard(boardCopy);
        setXisNext(!xIsNext);
        const cc = Number(i);
        socket.emit('isPlay', cc);
      }
      else if(localName[0] == name[1] && !xIsNext){
      const boardCopy = [...board];
      if(winner || boardCopy[i]) return;
        boardCopy[i] = xIsNext ? 'X' : 'O';
        setBoard(boardCopy);
        setXisNext(!xIsNext);
        const cc = Number(i);
        socket.emit('isPlay', cc);
      }
    }
    }

    useEffect(() => {
    socket.on('logIn', (data) => {
      console.log('New user logged in ' + data.user_name);
      setName(prevName => [...prevName, data.user_name]);
    });
  }, []);

  
  function restartGame(){
    setBoard(Array(9).fill(null));
    setXisNext(true);
    const data = 'game cleared';
    socket.emit('game', data);
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
  

  useEffect(() => {
    socket.on('chat', (data) => {
      console.log('Chat event received!');
      console.log(data);
      setMessages(prevMessages => [...prevMessages, data.message]);
    });
  }, []);
  
  useEffect(() => {
    socket.on('game', (data) => {
      console.log(data);
      setBoard(Array(9).fill(null));
      setXisNext(true);
    });
  }, [restartGame]);

    return (
        <>  
        <div>
        <div> 
              {PopLogIn(modalIsOpen, userName, fetchUserName)}
            </div>
            <div>
            <Board squares={board} onClick={handleClick} />
            <div style={styles}>
                <p> X : {name[0]} O: {name[1]} </p>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                <button onClick={restartGame}> Restart Game </button>
            </div>
            </div>
          <div className="mainLayout">  
            <div className="chatRoom">
              {chatBox(messages, onClickButton, inputRef)}
            </div>
            
            <div className="UserList">
                {userList( name)}
            </div>
          </div>
        </div>
        </>
    )
}

export default App;
