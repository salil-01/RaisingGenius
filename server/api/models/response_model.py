# models/user_model.py
from flask_pymongo import ObjectId


class Response:
    collection = 'responses'

    @classmethod
    def create(cls,user_id, name, chats):
        from app import mongo
        response_data = {
            'user_id': user_id,
            'name': name,
            'chats': chats,
        }
        return mongo.db[cls.collection].insert_one(response_data)

    @classmethod
    def find_by_user_id(cls, user_id):
        from app import mongo
        return mongo.db[cls.collection].find({'user_id':user_id})
