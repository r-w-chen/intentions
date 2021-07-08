from datetime import datetime, timezone
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import TodoSession, db

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
    return todo.to_dict()

@todos_routes.route('/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    print("DELETE TODO", todo_id )
    return jsonify("DELETE TODO")