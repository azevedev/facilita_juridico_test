from config import db

# Activity Model (id, name, done, link, price, participants, type)
class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    link = db.Column(db.String(120), unique=False, nullable=True)
    price = db.Column(db.Float, unique=False, nullable=True)
    participants = db.Column(db.Integer, unique=False, nullable=True)
    done = db.Column(db.Boolean(), unique=False, nullable=False, default=False)
    type = db.Column(db.String(120), unique=False, nullable=True)
    key = db.Column(db.String(120), unique=False, nullable=False)
    def __repr__(self):
        return f"<Activity {self.name}>"

    def to_json(self):
        return {
            "id": self.id,
            "key": self.key,
            "name": self.name,
            "price": self.price,
            "link": self.link,
            "type": self.type,
            "participants": self.participants,
            "done": self.done,
        }
