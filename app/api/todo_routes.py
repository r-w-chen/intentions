from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import TodoSession, TodoExercise, db

todos_routes = Blueprint('todos', __name__)


@todos_routes.route('/<int:user_id>')
# @login_required
def get_todos(user_id):
    print("GET TODO", user_id)
    todos = (TodoSession.query.filter(TodoSession.user_id == user_id)
                               .order_by(TodoSession.date_scheduled.asc())
                               .all())
    for todo in todos:
        print("AMEN", todo.id)
    # todays_todos = todos.filter()

    # print("WHAT DIS", todos[0].date_scheduled, type(todos[0].date_scheduled))
    # return {f'asdfasd+{todo.id}': todo.to_dict() for todo in todos}
    return jsonify([todo.to_dict() for todo in todos])


@todos_routes.route('/', methods=['POST'])
def add_todo():
    print("POST TODO", request.json)
    data = request.json
    todo = TodoSession()
    todo.user_id = data['user_id']
    todo.session_id = data['session_id']
    date = request.json['date']
    date_format = '%Y-%m-%dT%H:%M:00Z'
    try:
        date_obj = datetime.strptime(date, date_format)
        date_obj.replace(tzinfo=timezone.utc)
        print(date_obj)
        # print(type(date_obj))
        # print(datetime.now())
        todo.date_scheduled = date_obj
    except ValueError:
        print("Incorrect data format, should be YYYY-MM-DD")
        return {'error': 'invalid date format'}
    db.session.add(todo)
    db.session.commit()

    for s_e in data['s_exercises']:
        todo_exercise = TodoExercise()
        todo_exercise.todo_session_id = todo.id
        todo_exercise.session_exercise_id = s_e
        db.session.add(todo_exercise)
    db.session.commit()
    return todo.to_dict()

@todos_routes.route('/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    print("DELETE TODO", todo_id )
    return jsonify("DELETE TODO")

@todos_routes.route('/completed/<int:todo_session_id>', methods=['PATCH'])
def update_todo_session_status(todo_session_id):
    print('SESH UPDATE RECEIVED', todo_session_id,request.json)
    data = request.json
    todo_session = TodoSession.query.get(data['id'])
    todo_session.completed = data['completed']
    todo_session.date_completed = data['date_completed']
    db.session.add(todo_session)
    db.session.commit()
    # If the boolean is True
        # Check if completed is already True
            # If it is, don't make any changes (to avoid changing date)
        # Set completed to True
        # Set completed_date
    # If the boolean is False 
        # Set completed to False
        # If completed_date to None? 
    return todo_session.to_dict()

@todos_routes.route('/exercises/<int:todo_exercise_id>', methods=['PATCH'])
def update_todo_exercise(todo_exercise_id):
    print("UPDATE TODO EX", todo_exercise_id, request.json)
    data = request.json
    todo_exercise = TodoExercise.query.get(todo_exercise_id)
    todo_exercise.completed = data['is_checked']
    db.session.add(todo_exercise)
    db.session.commit()
    return todo_exercise.to_dict()