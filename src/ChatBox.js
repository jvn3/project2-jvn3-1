import React from 'react';
import {ListItem} from './ListItem';
import './App.css'
export function chatBox(messages, onClickButton, inputRef){
    return(
        <div>
            <h1> CHAT ROOM </h1>
            Enter a message here: <input ref={inputRef} type="text" />
            <button onClick={onClickButton}> Send </button>
            <ul className="ulClass">
                 {messages.map((item, index) => <ListItem key={index} name= {item} />)}
            </ul>
        </div>
    );
}

export default chatBox