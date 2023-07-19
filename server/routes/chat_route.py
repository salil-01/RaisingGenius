from flask import Blueprint, request, jsonify

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/chat", methods=["GET"])
def chat():
    return jsonify({"msg":"chat route working"})