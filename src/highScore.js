import React from 'react';
import './App.css';

export function highScoreBoard(dbUser, dbScore, ID){
    
    return(
    <div> 
    
        <table>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Score</th>
          </tr>
          
          <tr>
            <td>{ID[0]}</td>
            <td>{dbUser[0]}</td>
            <td>{dbScore[0]}</td>
          </tr>
          
          <tr>
            <td>{ID[1]}</td>
            <td>{dbUser[1]}</td>
            <td>{dbScore[1]}</td>
          </tr>
          
           <tr>
            <td>{ID[2]}</td>
            <td>{dbUser[2]}</td>
            <td>{dbScore[2]}</td>
           </tr>
        </table>
        
    </div>
    );
}

export default highScoreBoard