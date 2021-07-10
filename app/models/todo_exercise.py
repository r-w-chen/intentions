from .db import db

class TodoExercise(db.Model):
    __tablename__ = "todo_exercises"

    id = db.Column(db.Integer, primary_key = True)
    todo_session_id = db.Column(db.Integer, db.ForeignKey("todo_sessions.id"), nullable = False)
    session_exercise_id = db.Column(db.Integer, db.ForeignKey("session_exercise.id"), nullable = False)
    completed = db.Column(db.Boolean, default = False)

    session_exercise = db.relationship("Session_exercise", back_populates="todo_exercises")
    
    def to_dict(self):
        return {
            "id": self.id,
            "todo_session_id": self.todo_session_id,
            "s_exercise": self.session_exercise.to_dict(),
            "completed": self.completed
        }

