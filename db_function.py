""" db_function.py All the databases function."""
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from app import APP
import models

DB = SQLAlchemy(APP)


def add_user(data):
    """ adds user to the databases """
    database_check = DB.session.query(models.Player.userName).filter_by(
        userName=data['user_name']).first() is not None
    if database_check is not True:
        new_user = models.Player(userName=data['user_name'], score=100)
        DB.session.add(new_user)
        DB.session.commit()


def update_score(data):
    """ updates the score in the databases """
    print(data)
    winner_db = DB.session.query(
        models.Player).filter_by(userName=data['dic']['winnerName']).first()
    winner_db.score = winner_db.score + 1
    opponent_db = DB.session.query(
        models.Player).filter_by(userName=data['dic']['opponentName']).first()
    opponent_db.score = opponent_db.score - 1
    DB.session.commit()


def get_all_users():
    """ gets all the users and returns a dictionary"""
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

    return {'users': users, 'score': score}
