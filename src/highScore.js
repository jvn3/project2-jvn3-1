import React from 'react';
import './App.css';
import Modal from 'react-modal'
import {useState} from 'react';

export function highScoreBoard(dbUser, dbScore, ID, isHighScoreModal, setIsHighScoreModal ){
    
    
    const style = {
        overlay: {
            background: 'grey'
        },
        content: {
            color: 'black'
        },
    };
  

    
    return(
      <div>
        <button className="buttonHighScore" onClick={()=>setIsHighScoreModal(!isHighScoreModal)}> Show High Score Board </button>
          <div className='highScoreBoardModal'>
            <Modal isOpen={isHighScoreModal} style={style} className='highScoreBoardModal1'>
              <center>
                <h2> High Score Board </h2>
                <table className="highScoreBoardTable">
                  <tr>
                    <th> Rank # </th>
                    <th> Name </th>
                    <th> Score </th>
                  </tr>
                  
                  {dbUser.map((item, index) => {
                    const userScore = dbScore[index];
                    
                    return(
                      <tr>
                        <th> {(index +1) + '.'} </th>
                        <th> {item}</th>
                        <th> {userScore} </th>
                      </tr>
                    );
                  })}
                  
                </table>
                <button className='closeHighScoreBoard' onClick={()=>setIsHighScoreModal(!isHighScoreModal)}> Close </button>
              </center>
            </Modal>
          </div>
      </div>
    );
}

export default highScoreBoard