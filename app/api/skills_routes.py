from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Exercise

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
    return jsonify("RECEIVED POST")

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