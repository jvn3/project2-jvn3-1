from app import db

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
        
#postgres://eazymjqahhtgvl:96070ed431c15e08a4929864afed0d8d430aec66e9c4c9d6037e20521c9fa0fd@ec2-54-87-34-201.compute-1.amazonaws.com:5432/d6i1u4k52gpclm