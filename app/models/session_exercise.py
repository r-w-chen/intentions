from .db import db

class Session_exercise(db.Model):
    __tablename__ = "session_exercise"

    id = db.Column(db.Integer, primary_key = True)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"), nullable = False)
    session_id = db.Column(db.Integer, db.ForeignKey("sessions.id"), nullable = False)
    quantity = db.Column(db.Integer)
    time = db.Column(db.Integer)
    completed = db.Column(db.Boolean, default = False)


    exercise = db.relationship("Exercise", back_populates="session_exercises")
    session = db.relationship("Session", back_populates="session_exercises")
    
    def to_dict(self):
        return {
            "id": self.id,
            "exercise": self.exercise.to_dict(),
            "quantity": self.quantity,
            "time": self.time
        }

