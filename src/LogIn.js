import React from 'react';
import Modal from 'react-modal'
import {useEffect, useState, useRef} from 'react';

Modal.setAppElement('#root');
export function PopLogIn(modalIsOpen ,userName, fetchUserName){
    
    const style = {
        overlay: {
            background: 'grey'
        },
        content: {
            color: 'orange'
        }
    }
    
    
    
    return (
        <div className='LogIn'> 
            <Modal isOpen={modalIsOpen} style={style}> 
                <h2> Log In Page </h2>
                    <div class="container">
                        <input ref={userName} type="text" placeholder="Enter Username" required/>
                    </div>
                <button onClick={fetchUserName}> Log In </button>
            </Modal>
        </div>
    );
}
