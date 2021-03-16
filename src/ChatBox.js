import React from 'react';
import {ListItem} from './ListItem';
import './App.css'
export function chatBox(messages, onClickButton, inputRef, dbUser, dbScore, ID, isHighScoreModal, setIsHighScoreModal, highScoreBoard){
    return(
        <div>
            <div className="chatRoomHeaderDiv">
            <h4 className="chatRoomHeader"> CHAT ROOM  </h4> 
            {highScoreBoard(dbUser, dbScore, ID, isHighScoreModal, setIsHighScoreModal)}
            </div>
            <p className="p"> Enter a message here: <input ref={inputRef} type="text" /> <button className="sendButton" onClick={onClickButton}> Send </button> </p>
            
            <ul className="ulClass">
                 {messages.map((item, index) => <ListItem key={index} name= {item} />)}
            </ul>
        </div>
    );
}

export default chatBox