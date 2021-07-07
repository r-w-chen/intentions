from .db import db

class TodoSession(db.Model):
    __tablename__ = "todo_sessions"

    id = db.Column(db.Integer, primary_key = True)
    session_id = db.Column(db.Integer, db.ForeignKey("sessions.id"), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    date_scheduled = db.Column(db.DateTime, nullable=False)
    
    session = db.relationship("Session", backref="todo_sessions")
    
    def to_dict(self):
        return {
            "id": self.id,
            "date_scheduled": self.date_scheduled,
            "session": self.session.to_dict(),
        }

