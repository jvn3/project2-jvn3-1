import React from 'react';
import './board.css';



export const Square = ({ value, onClick }) => (
    <button className="box" onClick={onClick}>
        {value}
    </button>
);

export default Square