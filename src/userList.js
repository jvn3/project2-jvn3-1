import React from 'react';
import {ListItem} from './ListItem';

export function userList(name){
    //// {user.map((item, index) => <listUser key={index} name= {item}/>)}
    return(
        <div className="userList">
            <h1> USER LIST </h1>
            <ul>
                 {name.map((item, index) => <ListItem key={index} name= {item} />)}
            </ul>
        </div>
    );
}

export default userList