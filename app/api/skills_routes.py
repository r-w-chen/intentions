from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Skill, db

skills_routes = Blueprint('skills', __name__)


@skills_routes.route('/<int:user_id>')
# @login_required
def get_skills(user_id):
    print("GET RECEIEVED", user_id)
    return jsonify("RECEIVED GET")

@skills_routes.route('/', methods=['POST'])
# @login_required
def add_skill():
    print("POST RECEIVED")
    new_skill = Skill()
    print("ANYTHING IN HERE?" , request.json)
    new_skill.name = request.json["name"]
    new_skill.user_id = request.json["user_id"]
    db.session.add(new_skill)
    db.session.commit()
    return new_skill.to_dict()

@skills_routes.route('/<int:skill_id>', methods=['PUT'])
# @login_required
def edit_skill(skill_id):
    print("PUT RECEIVED", skill_id)
    return jsonify("RECEIVED PUT")


@skills_routes.route('/<int:skill_id>', methods=['DELETE'])
# @login_required
def delete_skill(skill_id):
    print("DELETE RECEIVED", skill_id)
    return jsonify("RECEIVED DELETE")