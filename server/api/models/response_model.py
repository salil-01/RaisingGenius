# models/user_model.py
from flask_pymongo import ObjectId


class User:
    collection = 'responses'

    @classmethod
    def create(cls,user_id, query, response):
        from app import mongo
        response_data = {
            'user_id': user_id,
            'query': query,
            'response': response,
        }
        return mongo.db[cls.collection].insert_one(response_data)

    @classmethod
    def find_by_id(cls, user_id):
        from app import mongo
        return mongo.db[cls.collection].find_one({'_id': ObjectId(user_id)})