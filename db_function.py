import app
import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask, send_from_directory, json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from dotenv import load_dotenv, find_dotenv
from app import APP
import models
from models import Player

DB = SQLAlchemy(APP)
def add_user(data):
    database_check = DB.session.query(models.Player.userName).filter_by(
        userName=data['user_name']).first() is not None

    if database_check is not True:
        new_user = models.Player(userName=data['user_name'], score=100)
        DB.session.add(new_user)
        DB.session.commit()
        
def update_score(data):
    winner_db = DB.session.query(
        models.Player).filter_by(userName=data['dic']['winnerName']).first()
    winner_db.score = winner_db.score + 1
    opponent_db = DB.session.query(
        models.Player).filter_by(userName=data['dic']['opponentName']).first()
    opponent_db.score = opponent_db.score - 1
    DB.session.commit()
    
def get_all_users():
    all_people = DB.session.query(models.Player)
    descending_list = sqlalchemy.sql.expression.desc(models.Player.score)
    descending_query = all_people.order_by(descending_list)

    users = []
    score = []
    database_id = []

    for person in descending_query:
        users.append(person.userName)
        database_id.append(person.id)
        score.append(person.score)
    
    return {
        'users': users,
        'score': score,
        'id': database_id
    }
    
if '__name__' == '__main__':
    from app import APP
    import models
    from models import Player