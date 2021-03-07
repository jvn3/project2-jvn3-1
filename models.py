from app import db


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(80), unique=True, nullable=False)
    score = db.Column(db.Integer)
    
    def __repr__(self):
        return '<Player %d %r %d>' % (self.id, self.userName, self.score)