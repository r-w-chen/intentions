from .db import db


class Skill(db.Model):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    user = db.relationship("User", back_populates="skills")
    exercises = db.relationship("Exercise", back_populates="skill", cascade="all, delete-orphan")
    sessions = db.relationship("Session", back_populates="skill", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "exercises": [exercise.to_dict() for exercise in self.exercises]
        }