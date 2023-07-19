import openai
from flask import Blueprint, request, jsonify, g, current_app
from auth.auth import authenticate_and_authorize
chat_bp = Blueprint("chat", __name__)


@chat_bp.route('/chat', methods=['POST'])
@authenticate_and_authorize
def chat():
    # Get the user's query from the request
    user_message = request.json.get("query")
    # print(user_message)
    # Get the OpenAI API key from the app config
    openai_api_key = current_app.config['OPENAI_API_KEY']

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Welcome to the Children Consulting Services! How can I assist you by providing related to kids?"},
            {"role": "user", "content": user_message}
        ],
        api_key=openai_api_key
    )

    # Get the response from OpenAI
    bot_response = response.choices[0].message.content

    # Return the bot's response to the client
    return jsonify({'response': bot_response}), 200
