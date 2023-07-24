from flask import Blueprint, request, jsonify, current_app, g
from auth.auth_decorator import authenticate_and_authorize
from models.response_model import Response
from bson import json_util
import json
from flask_pymongo import ObjectId

response_bp = Blueprint('/conversation', __name__)


@response_bp.route('/conversation/user', methods=['POST'])
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

@response_bp.route('/conversation/user', methods=['PUT'])
@authenticate_and_authorize()
def update_conversation():
    user_id = g.user_id
    data = request.json
    data["_id"] = ObjectId(data["_id"])
    # print(payload)
    if(user_id!=data["user_id"]):
        return jsonify({'message':"Unauthorized Access"}), 404

    Response.update_by_chat_id(data["_id"], data)
    return jsonify({'message':"Updated Successfully"}), 200