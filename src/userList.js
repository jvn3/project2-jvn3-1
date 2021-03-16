import React from 'react';
import {ListItem} from './ListItem';
import './App.css' 
export function userList(name){
    //// {user.map((item, index) => <listUser key={index} name= {item}/>)}

    const style={
        width: "70%",
        margin: "auto",
        color: "green"
    };

    return(
        <div>
            <div className="userListHeaderDiv">
            <h4 className="chatRoomHeader" > Online Friends </h4>
            </div>
            <ul style={style}>
                 {name.map((item, index) => <ListItem key={index} name= {item} />)}
            </ul>
        </div>
    );
}

export default userList