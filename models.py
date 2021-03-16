""" Models.py Database """
from app import DB

class Player(DB.Model):
    """ Player Table Column and rows for the DB """
    id = DB.Column(DB.Integer, primary_key=True)
    userName = DB.Column(DB.String(80), unique=True, nullable=False)
    score = DB.Column(DB.Integer)
    def __repr__(self):
        return '<Player %d %r %d>' % (self.id, self.userName, self.score)
    