from flask import Blueprint, request, jsonify, current_app, g
from auth.auth_decorator import authenticate_and_authorize
from models.response_model import Response
from bson import json_util
import json

response_bp = Blueprint('/conversation', __name__)


@response_bp.route('/conversation', methods=['POST'])
@authenticate_and_authorize()
def post_conversation():

    name = request.json.get('name')
    chats = request.json.get('chats')
    user_id = str(g.user_id)
    Response.create(user_id, name, chats)

    return jsonify({'message': 'Conversation Saved successfully'}), 200

@response_bp.route('/conversation/user', methods=['GET'])
@authenticate_and_authorize()
def get_conversation():
    user_id = g.user_id
    Conversation = Response.find_by_user_id(user_id)
    conversation_list = list(Conversation)
#    custom serialization
    for item in conversation_list:
        item['_id'] = str(item['_id'])

    json_conversation = json.dumps(conversation_list, default=json_util.default)
    return jsonify({'message':json_conversation}), 200
