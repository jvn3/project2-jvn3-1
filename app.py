import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from dotenv import load_dotenv, find_dotenv
import json


app = Flask(__name__, static_folder='./build/static')
load_dotenv(find_dotenv())
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


@socketio.on('connect')
def on_connect():
    print('User connected!')
    all_people = models.Player.query.all()
    users=[]
    score=[]
    ID=[]
    for person in all_people:
        users.append(person.userName)
        ID.append(person.id)
        score.append(person.score)
        
    socketio.emit('user_list', {'users': users, 'score': score, 'id': ID}, broadcast=True, include_self=False)

@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')



@socketio.on('isPlay')
def moveMade(data): 
    #print(data)
    socketio.emit('isPlay',  data, broadcast=True, include_self=False)


@socketio.on('chat')
def on_chat(data):
    #print(str(data))
    socketio.emit('chat',  data, broadcast=True, include_self=False)

@socketio.on('game')
def clearGame(data):
    print('GAME RESET')
    print(data)
    socketio.emit('game', data , broadcast=True, include_self=True)


@socketio.on('winner')
def winner(data):
    print('Initial Printing Data')
    winnerDB = db.session.query(models.Player).filter_by(userName=data['dic']['winnerName']).first() 
    winnerDB.score = winnerDB.score + 1
    opponentDB = db.session.query(models.Player).filter_by(userName=data['dic']['opponentName']).first()
    opponentDB.score = opponentDB.score - 1
    db.session.commit()
    
    all_people = db.session.query(models.Player)
    descendingList = sqlalchemy.sql.expression.desc(models.Player.score)
    queryDescending = all_people.order_by(descendingList)
    
    users=[]
    score=[]
    ID=[]
    
    for person in queryDescending:
        users.append(person.userName)
        ID.append(person.id)
        score.append(person.score)
    
    print('WINNER DB: ' + str(winnerDB))
    print('OPPONENT DB: ' + str(opponentDB))
    socketio.emit('user_list', {'users': users, 'score': score, 'id': ID}, broadcast=True, include_self=True)
    
@socketio.on('logIn')
def logIn(data):
    #print(str(data))
    
    dataBaseCheck = db.session.query(models.Player.userName).filter_by(userName=data['user_name']).first() is not None
    
    if(dataBaseCheck != True):
        new_user = models.Player(userName=data['user_name'], score=100)
        db.session.add(new_user)
        db.session.commit()
        
    
    all_people = db.session.query(models.Player)
    descendingList = sqlalchemy.sql.expression.desc(models.Player.score)
    queryDescending = all_people.order_by(descendingList)
    
    dic = {}
    users=[]
    score=[]
    ID=[]
    
    for person in queryDescending:
        users.append(person.userName)
        ID.append(person.id)
        score.append(person.score)
    dic=dict(zip(ID, map(list, zip(map(str, users), map(int, score)))))
    print(dic)
    socketio.emit('user_list', {'users': users, 'score': score, 'id': ID}, broadcast=True, include_self=True)
    socketio.emit('logIn', data , broadcast=True, include_self=False)
    
if __name__ == "__main__":
    import models
    from models import Player
    db.create_all()
    models.Player.query.all()
    
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        debug=True,
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )