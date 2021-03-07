import './App.css';
import {useEffect, useState, useRef} from 'react';
import Board from './Board';
import io from 'socket.io-client';
import {calculateWinner} from './helper';
import {chatBox} from './ChatBox';
import {PopLogIn} from './LogIn';
import {userList} from './userList'
import {ListItem} from './ListItem';
import {highScoreBoard} from './highScore';
import {listHighScore} from './ListItem';
const socket = io();
var winnerName='';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const inputRef = useRef(null);
  const userName = useRef(null);
  const [messages, setMessages] = useState([]);
  const [modalShow, setModalShow] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [name, setName] = useState([]);
  const [dbUser, setDbUser] = useState([]);
  const [dbScore, setDbScore] = useState([]);
  const [ID, setID] = useState([]);
  const [isShow, setIsShow] = useState(false);
  
var counter = 0;


 const [localName, setLocalName] = useState([]);   // local name of user 
  const addModalClose = () => setModalShow=false;
  
  let cond = false;
  var opponentName='';
  let winnerIndex;
  var dic = {};
  let opponentIndex;
  
  
  useEffect(() => {
    if(winner=='X'){
      winnerName=name[0];
      opponentName=name[1];
      winnerIndex = dbUser.indexOf(winnerName);
      opponentIndex = dbUser.indexOf(opponentName);
      cond = true;
    } else if (winner=='O'){
      winnerName = name[1];
      opponentName=name[0];
      opponentIndex = dbUser.indexOf(opponentName);
      winnerIndex = dbUser.indexOf(winnerName);
      cond = true;
    }
  
    
      if(cond===true){
        dic = {'winnerName': winnerName, 'opponentName': opponentName, 'winnerIndex': winnerIndex, 'opponentIndex': opponentIndex};
        console.log('Chat event received!');
        console.log(dic);
        if(localName[0]===name[0]){
          socket.emit('winner', {dic});
        }
      }
  }, [winner]);
  
    
  function onClickButton(){
    if (inputRef != null){
      const message = localName[0] + ': ' + inputRef.current.value;
      setMessages(prevMessages => [...prevMessages, message]);
      socket.emit('chat', {message: message});
    }
  }
  
  function fetchUserName(){
    if(userName != null){
      const user_name = userName.current.value;
      setName(prevName => [...prevName, user_name]);
      setLocalName(prevLocalName => [...prevLocalName, user_name]);
      setModalIsOpen(false);
      counter = counter + 1;
      socket.emit('logIn', {user_name});
    }
  }
  
    function handleClick(i){
    console.log(xIsNext);
    if(localName[0] == name[0] || localName[0] == name[1]){
      if(localName[0] == name[0] && xIsNext){
      const boardCopy = [...board];
      console.log("BOARD COPY");
      console.log(boardCopy);
      let turn = '';
      if(winner || boardCopy[i]) return;
        turn = xIsNext ? 'X' : 'O';
        //setBoard(boardCopy);
        
        setBoard((prevBoard) => {
          let newBoard = [...prevBoard];
          newBoard[i] = turn;
          return newBoard;
        });
        setXisNext(tempXIsNext => tempXIsNext = !tempXIsNext);
        const cc = Number(i);
        socket.emit('isPlay', {cc: cc, turn:xIsNext});
      }
      
      else if(localName[0] == name[1] && !xIsNext){
      const boardCopy = [...board];
      let turn = '';
      if(winner || boardCopy[i]) return;
        turn = xIsNext ? 'X' : 'O';
        setBoard((prevBoard) => {
          let newBoard = [...prevBoard];
          newBoard[i] = turn;
          return newBoard;
        });
        setXisNext(tempXIsNext => tempXIsNext = !tempXIsNext);
        const cc = Number(i);
        socket.emit('isPlay', {cc: cc, turn:xIsNext});
      }
    }
    }


  
  function restartGame(){
    const tempList = [null, null, null, null, null, null, null, null, null];
    setBoard(tempList);
    setXisNext(tempXIsNext => tempXIsNext = true);
    const data = 'game cleared';
    socket.emit('game', data);
  }

  
  
    useEffect(() => {
    
      socket.on('user_list', (data) => {
        setDbUser(data.users);
        setDbScore(data.score);
        setID(data.id);
      });
      
      socket.on('game', (data) => {
        const tempList = [null, null, null, null, null, null, null, null, null];
        setBoard(tempList);
        console.log(data);
        setXisNext(tempXIsNext => tempXIsNext = true);
      });
    
      socket.on('chat', (data) => {
        setMessages(prevMessages => [...prevMessages, data.message]);
      });
    
      socket.on('logIn', (data) => {
        console.log('New user logged in ' + data.user_name);
        setName(prevName => [...prevName, data.user_name]);
      });
    
      socket.on('isPlay', (data) => {
        console.log('A move had been made at ' + (data.cc+1));
        setXisNext(tempXIsNext => tempXIsNext = !tempXIsNext);
        setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        newBoard[data.cc] = data.turn ? 'X' : 'O';
        return newBoard;
      });
      
    });
  }, []);
  
  
    return (
    <div>
    <div> 
      {PopLogIn(modalIsOpen, userName, fetchUserName)}
    </div>
   
    <div class="grid-container">
      <div class="boardName">  {localName[0]}'s Board </div>
      <div class="userListgrid"> {userList( name)} </div>
      
      <div class="mainBoardGrid"> 
        <Board squares={board} onClick={handleClick} />  
         <p> &emsp; X : {name[0]} &emsp;  &ensp;  O: {name[1]} </p>
         <p> &emsp; {winner ? 'Winner: ' + winnerName : 'Next Player: ' + (xIsNext ? name[0]: name[1])} </p>
         <p> &emsp; &emsp; <button onClick={restartGame}> Restart Game </button> </p>
      </div> 
      
      <div class="chatBoxgrid"> {chatBox(messages, onClickButton, inputRef)} </div>
      
      
          <button onClick={()=>setIsShow(!isShow)}> Show Leader Board  </button>
          <div class="highScore">
          {
            isShow ?
          <div>
            <div className="userListScore">
              {dbUser.map((item, index) => <ListItem key={index} name= {item} />)}
            </div>
            
            <div className="scoreList">
              {dbScore.map((item, index) => <ListItem key={index} name= {item} />)}
            </div>
          </div>
          :null
            
          }
          </div>
      </div>
    </div>

 
    );
}


export default App;
