from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Exercise, Session, Session_exercise, db

sessions_routes = Blueprint('sessions', __name__)


@sessions_routes.route('/<int:skill_id>')
# @login_required
def get_sessions(skill_id):
    print("GET RECEIEVED", skill_id)
    return jsonify("RECEIVED GET")

@sessions_routes.route('/', methods=['POST'])
# @login_required
def add_sessions():
    print("POST RECEIVED", request.json)
    data = request.json
    # Create new Session
    # Get session ID of created session
    # Iterate through exercises and create a session_exercise from each one
    if data['name']:
        session = Session()
        session.name = data['name']
        session.user_id = data['user_id']
        session.skill_id = data['skill_id']
        db.session.add(session)
        db.session.commit()
        added_session = Session.query.order_by(Session.id.desc()).first()
        print("QUERIED SESSION", added_session.id)
        for exercise in data['exercises']:
            session_exercise = Session_exercise()
            session_exercise.exercise_id = exercise['id']
            session_exercise.session_id = added_session.id
            db.session.add(session_exercise)
        db.session.commit()
        return added_session.to_dict()
    else:
        return {'errors': ['Please specify a session name']}
    

@sessions_routes.route('/<int:session_id>', methods=['PUT'])
# @login_required
def edit_sessions(session_id):
    print("PUT RECEIVED", session_id)
    return jsonify("RECEIVED PUT")


@sessions_routes.route('/<int:session_id>', methods=['DELETE'])
# @login_required
def delete_sessions(session_id):
    print("DELETE RECEIVED", session_id)
    return jsonify("RECEIVED DELETE")