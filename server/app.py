from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home_page():
    return jsonify({"msg":"You are running Raising Genuis Backend"})

if __name__ == "__main__":
    app.run()
