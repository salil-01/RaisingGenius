from flask import Blueprint, request, jsonify, current_app
from auth.auth_decorator import authenticate_and_authorize
chat_bp = Blueprint('/chat', __name__)
import json
import openai
import difflib


def get_response(user_query):
    try:
        apiKey = current_app.config['OPENAI_API_KEY']
        
        # Create a list of messages with user queries and model responses for warm-up
        warmup_prompt = {'role': 'system', 'content': 'You are a parental advisor assisting parents with their queries and concerns. Your goal is to provide personalized, heart-to-heart responses based on their questions and experiences. Your responses should be in the same tone and language as the examples provided earlier, creating a sense of connection with the parents seeking advice.Please keep the responses concise and focused on addressing the specific query and should be under 50-60, do not go more than that. Avoid using lengthy explanations or bullet points to ensure the responses feel more natural and human-like. You can use the stored data as inspiration, but make sure to generate unique and original content to provide the best guidance to the parents.Remember to be empathetic, understanding, and supportive in your replies, acknowledging the challenges parents face and offering practical solutions with a touch of warmth and care.Whenever a user sends a query, you can start your response by empathizing with their situation and then proceed to provide guidance and suggestions based on their specific concern. Be sure to tailor your response to the users query, making it relevant and meaningful to their situation.Let your responses reflect the heart-to-heart connection that parents seek in their quest for advice, and always prioritize the well-being of the child and fostering a positive and nurturing environment.'}
        
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[warmup_prompt,
            {"role": "user", "content": user_query}
        ],
        api_key=apiKey
       )
        intial_res = response.choices[0].message.content
        return intial_res


        # most_similar_query = difflib.get_close_matches(user_query, [entry['query'] for entry in data])[0]
        # response = [entry['answer'] for entry in data if entry['query'] == most_similar_query][0]
        # ai_response = ai_model.generate_response(response)

        # return response.choices[0].text.strip()  # Extract the response text
    except Exception as e:
        return str(e)


@chat_bp.route('/chat', methods=['POST'])
@authenticate_and_authorize()
def chat():
    try:
        data = request.json
        user_query = data['query']

        # Load or retrieve the chat history for the user (you can use a database for this)
        # For simplicity, I'm using a list in memory here

        # Get the model's response
        response = get_response(user_query)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)})
