# models/user_model.py
from flask_pymongo import ObjectId


class User:
    collection = 'users'

    @classmethod
    def create(cls, username, email, password, role):
        from app import mongo
        user_data = {
            'username': username,
            'email': email,
            'password': password,
            "role": role
        }
        return mongo.db[cls.collection].insert_one(user_data)

    @classmethod
    def find_by_email(cls, email):
        from app import mongo
        return mongo.db[cls.collection].find_one({'email': email})

    @classmethod
    def find_by_id(cls, user_id):
        from app import mongo
        return mongo.db[cls.collection].find_one({'_id': ObjectId(user_id)})
