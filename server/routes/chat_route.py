from flask import Blueprint, request, jsonify, g
from auth.auth import authenticate_and_authorize
chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["GET"])
@authenticate_and_authorize
def chat():
    print(g.user_id, g.role, g.email)
    return jsonify({"msg": "chat route wdorking fi"})
