from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Exercise, Session, Session_exercise, db, TodoSession, TodoExercise

sessions_routes = Blueprint('sessions', __name__)


@sessions_routes.route('/<int:user_id>')
# @login_required
def get_sessions(user_id):
    print("GET RECEIEVED", user_id)
    sessions = Session.query.filter(Session.user_id == user_id).all()

    return {session.id: session.to_dict() for session in sessions}

@sessions_routes.route('/', methods=['POST'])
# @login_required
def add_sessions():
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
        # print("QUERIED SESSION", added_session.id)
        # Iterate through each exercise in list and create a session_exercise that ties to the recently created session
        # for exercise in data['exercises']:
        #     session_exercise = Session_exercise()
        #     session_exercise.exercise_id = exercise['id']
        #     session_exercise.session_id = added_session.id
        #     db.session.add(session_exercise)
        db.session.commit()
        return added_session.to_dict()
    else:
        return {'errors': ['Please specify a session name']}
    

@sessions_routes.route('/exercise/<int:session_id>', methods=['POST'])
def add_session_exercise(session_id):
    print("ADD SESSION EXERCISE RECEIVED", session_id, request.json)
    session_exercise = Session_exercise()
    session_exercise.exercise_id = request.json
    session_exercise.session_id = session_id
    db.session.add(session_exercise)
    # Check if there are any scheduled todos for this session I'm adding to
    # If there is, create a todo_exercise tied to each todo_session relating to that session
    todo_sessions = TodoSession.query.filter(TodoSession.session_id == session_id).all()
    if todo_sessions:
        for todo in todo_sessions:
            # Create a new todo_exercise 
            todo_exercise = TodoExercise()
            todo_exercise.todo_session_id = todo.id
            todo_exercise.session_exercise_id = session_exercise.id
            db.session.add(todo_exercise)
    db.session.commit()
    return session_exercise.to_dict()

@sessions_routes.route('/<int:session_id>', methods=['PATCH'])
# @login_required
def edit_sessions(session_id):
    print("PUT RECEIVED", session_id, request.json)
    session = Session.query.get(session_id)
    session.name = request.json
    db.session.add((session))
    db.session.commit()
    return session.to_dict()


@sessions_routes.route('/<int:session_id>', methods=['DELETE'])
# @login_required
def delete_sessions(session_id):
    print("DELETE RECEIVED", session_id)
    session = Session.query.get(session_id)
    db.session.delete(session)
    db.session.commit()
    return jsonify(session.id)

@sessions_routes.route('/exercise/<int:session_exercise_id>', methods=['DELETE'])
def delete_session_exercise(session_exercise_id):
    print("DELETE SESSION RECEIVED", session_exercise_id)
    session_exercise = Session_exercise.query.get(session_exercise_id)
    db.session.delete(session_exercise)
    db.session.commit()
    return jsonify(session_exercise_id)

