from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Skill, db

skills_routes = Blueprint('skills', __name__)


@skills_routes.route('/<int:user_id>')
# @login_required
def get_skills(user_id):
    skills = Skill.query.filter(Skill.user_id == user_id).all()
    return {skill.id: skill.to_dict() for skill in skills}

@skills_routes.route('/', methods=['POST'])
# @login_required
def add_skill():
    name = request.json["name"]
    if len(name) == 0:
        return {'errors': ['Skill name cannot be empty']}
    else:
        new_skill = Skill()
        new_skill.name = name
        new_skill.user_id = request.json["user_id"]
        db.session.add(new_skill)
        db.session.commit()
        return new_skill.to_dict()

@skills_routes.route('/', methods=['PUT'])
# @login_required
def edit_skill():
    skill_id = request.json['id']
    
    skill = Skill.query.get(skill_id)
    skill.name = request.json['name']
    db.session.add(skill)
    db.session.commit()

    return skill.to_dict()


@skills_routes.route('/<int:skill_id>', methods=['DELETE'])
# @login_required
def delete_skill(skill_id):

    skill = Skill.query.get(skill_id)
    
    db.session.delete(skill)
    db.session.commit()
    return jsonify("RECEIVED DELETE")