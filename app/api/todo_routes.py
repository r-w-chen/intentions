import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import TodoSession, db

todos_routes = Blueprint('todos', __name__)


@todos_routes.route('/<int:user_id>')
# @login_required
def get_todos(user_id):
    print("GET TODO", user_id)
    return jsonify("GET TODO RECEIVED")


@todos_routes.route('/', methods=['POST'])
def add_todo():
    print("POST TODO", request.json)
    data = request.json
    todo = TodoSession()
    todo.user_id = data['user_id']
    todo.session_id = data['session_id']
    date = request.json['date']
    date_format = '%Y-%m-%dT%H:%M'
    try:
        date_obj = datetime.datetime.strptime(date, date_format)
        print(date_obj)
        print(type(date_obj))
        print(datetime.datetime.now())
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