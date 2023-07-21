# routes/auth_routes.py
import jwt
from flask import Blueprint, request, jsonify, current_app
from models.user_model import User
import datetime
user_bp = Blueprint('/', __name__)


@user_bp.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    role = "User"

    existing_user = User.find_by_email(email)
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 404

    User.create(username, email, password, role)

    return jsonify({'message': 'User registered successfully'}), 200


@user_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    # find user in db
    user = User.find_by_email(email)
    # print(user)
    if user and user['password'] == password:
        # Create JWT token with user_id and email stored in the data object
        jwt_payload = {
            'user_id': str(user['_id']),
            'email': user['email'],
            'role': user['role'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expiration time
        }
        jwt_secret = current_app.config['SECRET_KEY']
        token = jwt.encode(jwt_payload, jwt_secret, algorithm='HS256')

        return jsonify({'message': 'Login successful', 'token': token, "username": user["username"], "role": user["role"]}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
