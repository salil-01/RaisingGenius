# authorize.py
from functools import wraps
from flask import request, jsonify, g, current_app
import jwt


def authenticate_and_authorize(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Check if Authorization header is present
        if 'Authorization' not in request.headers:
            return jsonify({'message': 'Authorization required'}), 401

        # Get the token from the Authorization header
        token = request.headers['Authorization'].split()[1]

        try:
            # Verify and decode the token
            payload = jwt.decode(
                token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

            # Check if the role matches the required role
            if payload['role']:
                # Perform the protected action
                # using g module of flask to attach mail to request object
                g.email = payload["email"]
                g.user_id = payload["user_id"]
                g.role = payload["role"]
                # print(payload["id"])
                return func(*args, **kwargs)

            return jsonify({'message': 'Unauthorized access'}), 403

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

    return wrapper
