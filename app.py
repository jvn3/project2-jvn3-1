""" SERVER APP.PY  """
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv


APP = Flask(__name__, static_folder='./build/static')
load_dotenv(find_dotenv())
# Point SQLAlchemy to your Heroku Database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

CORSAPP = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """ index function """
    return send_from_directory('./build', filename)


@SOCKETIO.on('connect')
def on_connect():
    """SEND CLIENT DATABASE OF USERS WHEN CONNECTS TO THE APP"""
    print('User connected!')
    all_users_dic = get_all_users()

    SOCKETIO.emit('user_list',
                  all_users_dic,
                  broadcast=True,
                  include_self=False)

@SOCKETIO.on('disconnect')
def on_disconnect():
    """ PRINTS ON THE SERVER WHEN USER DISCONNECTS"""
    print('User disconnected!')


@SOCKETIO.on('isPlay')
def update_board(data):
    """ EMITS TO THE PLAYERS AND SPECTATORS WHEN A PLAY IS MADE ON THE BOARD"""
    #print(data)
    SOCKETIO.emit('isPlay', data, broadcast=True, include_self=False)


@SOCKETIO.on('chat')
def on_chat(data):
    """ EMITS THE MESSAGE TO THE ALL THE USERS WHEN A CHAT EVENT HAPPENS """
    #print(str(data))
    SOCKETIO.emit('chat', data, broadcast=True, include_self=False)


@SOCKETIO.on('game')
def clear_game(data):
    """ EMITS TO RESET THE BOARD WHEN RESTART GAME IS CLICKED """
    print('GAME RESET')
    print(data)
    SOCKETIO.emit('game', data, broadcast=True, include_self=True)


@SOCKETIO.on('winner')
def winner(data):
    """ EMIT THE UPDATED SCORE TO THE UI AND IN THE DATABASE WHEN A WINNER IS DECLARED """
    update_score(data)
    all_users_dic = get_all_users()
    SOCKETIO.emit('user_list',
                  all_users_dic,
                  broadcast=True,
                  include_self=True)



@SOCKETIO.on('logIn')
def log_in(data):
    """ GETS THE USERNAME OF THE NEW USER AND EMITS IT TO ALL THE USERS TO SHOW ON THE UI"""
    print("LOG IN DATA " + str(data))
    print(type(data))
    add_user(data)
    print("LOG IN DATA " + str(data))
    user_list_dic = get_all_users()
    SOCKETIO.emit('user_list',
                  user_list_dic,
                  broadcast=True,
                  include_self=True)
    SOCKETIO.emit('logIn', data, broadcast=True, include_self=False)

if __name__ == "__main__":
    import models
    from models import Player
    import db_function
    from db_function import add_user, get_all_users, update_score
    DB.create_all()
    models.Player.query.all()

    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
