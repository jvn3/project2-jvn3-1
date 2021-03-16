import React from 'react';
import './App.css'


const Square = ({ value, onClick }) => (
    <button className="Square" onClick={onClick}>
        {value}
    </button>
);

export default Square;



