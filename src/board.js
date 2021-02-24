import React from 'react';
import './board.css';
import Square from "./square.js"

export function Board({squares, onClick}){
    return(
        <div class="board">
            {squares.map((square, i) => {
                return  <Square key={i} value={square} onClick={() => onClick(i)} />
            })}
        </div>
    );
}



export default Board