from flask import Blueprint, request, jsonify, current_app
from auth.auth_decorator import authenticate_and_authorize
from models.response_model import Response

response = Blueprint('/conversation', __name__)


@user_bp.route('/conversation', methods=['POST'])
@authenticate_and_authorize()
def register():

    name = request.json.get('name')
    chats = request.json.get('chats')
    user_id = g.user_id
    Response.create(user_id, name, chats)

    return jsonify({'message': 'Conversation Saved successfully'}), 200