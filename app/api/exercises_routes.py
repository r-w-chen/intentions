from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Exercise

exercises_routes = Blueprint('exercises', __name__)


@exercises_routes.route('/<int:skill_id>')
# @login_required
def get_exercises(skill_id):
    print("GET RECEIEVED", skill_id)
    return jsonify("RECEIVED GET")

@exercises_routes.route('/', methods=['POST'])
# @login_required
def add_exercises():
    print("POST RECEIVED")
    return jsonify("RECEIVED POST")

@exercises_routes.route('/<int:exercise_id>', methods=['PUT'])
# @login_required
def edit_exercises(exercise_id):
    print("PUT RECEIVED", exercise_id)
    return jsonify("RECEIVED PUT")


@exercises_routes.route('/<int:exercise_id>', methods=['DELETE'])
# @login_required
def delete_exercises(exercise_id):
    print("DELETE RECEIVED", exercise_id)
    return jsonify("RECEIVED DELETE")