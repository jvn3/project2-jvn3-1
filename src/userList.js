import React from 'react';
import {ListItem} from './ListItem';
import './App.css' 
export function userList(name){
    //// {user.map((item, index) => <listUser key={index} name= {item}/>)}

    const style={
        width: "70%",
        margin: "auto"
    };

    return(
        <div>
            <p className="heading" > USER LIST </p>
            <ul style={style}>
                 {name.map((item, index) => <ListItem key={index} name= {item} />)}
            </ul>
        </div>
    );
}

export default userList