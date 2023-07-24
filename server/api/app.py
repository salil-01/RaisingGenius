from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os
# from routes.chat_route import chat_bp
# from routes.user_route import user_bp
# from routes.response_route import response_bp
# Load environment variables from .env file
load_dotenv()
PORT = os.getenv("PORT")
SECRET_KEY = os.getenv("SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MONGO_URL = os.getenv("MONGO_URL")


# Create Flask application
app = Flask(__name__)
CORS(app, origins='*')
app.config['SECRET_KEY'] = SECRET_KEY
app.config['OPENAI_API_KEY'] = OPENAI_API_KEY
app.config['MONGO_URI'] = MONGO_URL
app.config['PORT'] = PORT


# mongodb connection
mongo = PyMongo(app)

@app.teardown_appcontext
def close_mongo_connection(exception=None):
    mongo.cx.close()
# Blueprints
# app.register_blueprint(chat_bp)
# app.register_blueprint(user_bp)
# app.register_blueprint(response_bp)


@app.route("/", methods=["GET"])
def home_page():
    return jsonify({"msg": "You are running Raising Genuis Backend"})



if __name__ == "__main__":
    app.run(PORT=8080)

# env update