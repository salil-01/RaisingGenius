from flask import Flask, request, jsonify
from routes.chat_route import chat_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(chat_bp)

@app.route("/", methods=["GET"])
def home_page():
    return jsonify({"msg":"You are running Raising Genuis Backend"})

if __name__ == "__main__":
    app.run()
