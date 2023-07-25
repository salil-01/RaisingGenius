# models/user_model.py
from flask_pymongo import ObjectId


class Response:
    collection = 'responses'

    @classmethod
    def create(cls,user_id, name, chats):
        from api.app import mongo
        response_data = {
            'user_id': user_id,
            'name': name,
            'chats': chats,
        }
        return mongo.db[cls.collection].insert_one(response_data)

    @classmethod
    def find_by_user_id(cls, user_id):
        from api.app import mongo
        return mongo.db[cls.collection].find({'user_id':user_id})

    @classmethod
    def update_by_chat_id(cls, chat_id,updated_data):
        from api.app import mongo
        print(chat_id)
        return mongo.db[cls.collection].replace_one({'_id':ObjectId(chat_id)},updated_data)
