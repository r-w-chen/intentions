from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Exercise

sessions_routes = Blueprint('sessions', __name__)


@sessions_routes.route('/<int:skill_id>')
# @login_required
def get_sessions(skill_id):
    print("GET RECEIEVED", skill_id)
    return jsonify("RECEIVED GET")

@sessions_routes.route('/', methods=['POST'])
# @login_required
def add_sessions():
    print("POST RECEIVED")
    return jsonify("RECEIVED POST")

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