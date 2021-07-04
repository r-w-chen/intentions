from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Exercise, db

exercises_routes = Blueprint('exercises', __name__)


@exercises_routes.route('/<int:user_id>')
# @login_required
def get_exercises(user_id):
    # print("GET RECEIEVED", user_id)
    exercises = Exercise.query.filter(Exercise.user_id == user_id).all()
    # print(exercises)
    
    return jsonify([exercise.to_dict() for exercise in exercises])


@exercises_routes.route('/skill/<int:skill_id>')
def get_exercises_by_skill(skill_id):
    print("GET RECEIVED", skill_id)
    exercises = Exercise.query.filter(Exercise.skill_id == skill_id).all()
    return jsonify([exercise.to_dict() for exercise in exercises])

@exercises_routes.route('/', methods=['POST'])
# @login_required
def add_exercises():
    # print("POST RECEIVED", request.json)
    name = request.json['name']
    if len(name) == 0:
        return {'errors': ['Exercise name cannot be empty']}
    else:
    # TODO: refactor with wtforms
        exercise = Exercise()
        user_id = request.json['user_id']
        skill_id = request.json['skill_id']
        notes = request.json['notes']
        exercise.name = name
        exercise.user_id = user_id
        exercise.skill_id = skill_id
        exercise.notes = notes
        db.session.add(exercise)
        db.session.commit()
        return exercise.to_dict()
        


    return jsonify("RECEIVED POST")

# EDIT EXERCISE NAME
@exercises_routes.route('/<int:exercise_id>/name', methods=['PUT'])
# @login_required
def edit_exercise_name(exercise_id):
    updated_exercise = request.json
    print("PUT RECEIVED", updated_exercise)
    exercise = Exercise.query.get(exercise_id)
    exercise.name = updated_exercise['name']
    db.session.add(exercise)
    db.session.commit()

    return exercise.to_dict()

# EDIT EXERCISE NOTES
@exercises_routes.route('/<int:exercise_id>/notes', methods=['PUT'])
# @login_required
def edit_exercise_notes(exercise_id):
    updated_exercise = request.json
    print("PUT RECEIVED", updated_exercise)
    exercise = Exercise.query.get(exercise_id)
    exercise.notes = updated_exercise['notes']
    db.session.add(exercise)
    db.session.commit()

    return exercise.to_dict()


@exercises_routes.route('/<int:exercise_id>', methods=['DELETE'])
# @login_required
def delete_exercise(exercise_id):
    print("DELETE RECEIVED", exercise_id)
    exercise = Exercise.query.get(exercise_id)

    db.session.delete(exercise)
    db.session.commit()

    return jsonify("RECEIVED DELETE")