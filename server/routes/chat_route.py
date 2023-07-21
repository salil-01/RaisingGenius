from flask import Blueprint, request, jsonify, current_app

# Initialize OpenAI API with your API key
apiKey = current_app.config['OPENAI_API_KEY']

chat_bp = Blueprint('/chat', __name__)


def get_parental_advice(chat_history, user_query):
    try:
        # Create a list of messages with user queries and model responses for warm-up
        warmup_prompt = [
            {'role': 'system', 'content': 'Welcome to the Parental Advisor! How can I assist you today?'}
        ]

        # Create a list of messages with user queries and model responses from the chat history
        messages = warmup_prompt + [{'role': 'user', 'content': user_query}]
        for i in range(0, len(chat_history), 2):
            # User queries
            messages.append({'role': 'user', 'content': chat_history[i]})
            # Model responses
            messages.append({'role': 'system', 'content': chat_history[i+1]})

        # Make API call to GPT-3
        response = openai.Completion.create(
            engine="text-davinci-002",  # GPT-3 engine name
            messages=messages,
            # Adjust this value as per your token limit (free tier has 4096 tokens)
            max_tokens=100,
            # Specify stopping criteria for the response
            stop=["\n", "example"],
        )

        return response.choices[0].text.strip()  # Extract the response text
    except Exception as e:
        return str(e)


@chat_bp.route('/', methods=['POST'])
def get_advice():
    try:
        data = request.json
        user_query = data['query']

        # Load or retrieve the chat history for the user (you can use a database for this)
        # For simplicity, I'm using a list in memory here
        chat_history = data.get('chat_history', [])

        # Get the model's response
        response = get_parental_advice(chat_history, user_query)

        # Store the current user query and model response in the chat history
        chat_history.append(user_query)
        chat_history.append(response)

        return jsonify({'response': response, 'chat_history': chat_history})
    except Exception as e:
        return jsonify({'error': str(e)})
