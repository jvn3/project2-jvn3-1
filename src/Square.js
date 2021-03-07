import React from 'react';
import './App.css'
const style = {
    border: '1px solid white',
    background: 'transparent',
    color: 'white',
    borderRadius: '5px',
    fontSize: '50px',
    fontWeight: '520',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: " 'Lucida Handwriting', cursive "
};

const Square = ({ value, onClick }) => (
    <button style={style} onClick={onClick}>
        {value}
    </button>
);

export default Square;