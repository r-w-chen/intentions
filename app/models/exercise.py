from .db import db


class Exercise(db.Model):
    __tablename__ = "exercises"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable = False)
    notes = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable = False)

    skill = db.relationship("Skill", back_populates="exercises")
    user = db.relationship("User", back_populates="exercises")
    # Shows the sessions that this exercise is currently used in
    session_exercises = db.relationship("Session_exercise", back_populates="exercise", cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id,
            "skill_id": self.skill_id,
            "name": self.name,
            "notes": self.notes
        }

    def to_dict_include_skill(self):
        return {
            "id": self.id,
            "name": self.name,
            "notes": self.notes,
            "skill": self.skill.to_dict()
        }