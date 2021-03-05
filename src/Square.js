import React from 'react';

const style = {
    background: 'white',
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