from .db import db

class TodoSession(db.Model):
    __tablename__ = "todo_sessions"

    id = db.Column(db.Integer, primary_key = True)
    session_id = db.Column(db.Integer, db.ForeignKey("sessions.id"), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    date_scheduled = db.Column(db.DateTime, nullable=False)
    date_completed = db.Column(db.DateTime)
    completed = db.Column(db.Boolean, default = False)

    session = db.relationship("Session", backref="todo_sessions")
    todo_exercises = db.relationship("TodoExercise", backref='todo_session', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "date_scheduled": self.date_scheduled,
            "completed": self.completed,
            "date_completed": self.date_completed,
            "session": self.session.to_dict_no_exercises(),
            "todo_exercises": {e.id: e.to_dict() for e in self.todo_exercises}
        }

