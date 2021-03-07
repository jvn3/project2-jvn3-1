import React from 'react';

export function ListItem(props){
    return <li>
            {props.name}
        </li>
}

export function listUser(props){
    return <li>
        {props.name}
    </li>
}

export function listHighScore(props){
    return <li>
    {props.name} : {props.score}
    </li>
}