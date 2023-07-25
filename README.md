# Rising Genius

Welcome to Rising Genius, an innovative chat app that provides personalized advice to parents based on their queries. This app leverages the power of OpenAI's language model to offer intelligent responses to parental concerns and inquiries.

## Features

- Interactive and user-friendly chat interface.
- Personalized advice based on specific queries.
- Data Persistance and specific for each user.
- Simple and easy-to-understand UI for a smooth user experience.

## Tech Stack

- Backend:
  - Flask (Python)
  - MongoDB (for data storage)
  - Flask-PyMongo (MongoDB integration)
  - PyJWT (for JWT-based authentication)
  - Flask-CORS (for cross-origin resource sharing)

- Frontend:
  - Angular (TypeScript)
  - Tailwind CSS (for styling)
  - Angular HttpClient (for API interactions)
  - NgxSpinner (Interactive Spinners for loading state)
  - Toastr (Feedback Messages)

## Deployment

Rising Genius is deployed and accessible at: [https://gregarious-capybara-e6dcf7.netlify.app/](https://gregarious-capybara-e6dcf7.netlify.app/)


## Installation and Setup

1. Install Node.js and npm:

   - Download and install Node.js from the official website: https://nodejs.org/en/download/
   - npm (Node Package Manager) will be installed along with Node.js.

2. Clone the Bite Book App repository:

   ```
   git clone https://github.com/salil-01/RaisingGenius
   cd RaisingGenius
   ```

3. Set up the Flask backend:

   - Navigate to the `RaisingGenius/server` directory:
     ```
     cd server
     ```
   - Create a virtual environment (optional but recommended):
     ```
     python3 -m venv myenv
     source myenv/bin/activate   # On Windows:
     myenv\Scripts\activate      # On Linux / MacOS:
     ```
   - Install Flask and other dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Create a `.env` file in the backend directory and add any sensitive data, such as database credentials, API keys, etc.:
     ```
     SECRET_KEY = your_secret_key
     PORT = your_port
     OPENAI_API_KEY = your_openai_api_key
     MONGO_URL = your_url(mongodb)
     ```

4. Run the Flask development server:

   ```
   cd api
   python app.py
   ```

5. Set up the Angular frontend:

   - Navigate to the `RaisingGenius/client` directory:
     ```
     cd ../client
     ```
   - Install Angular CLI (if not already installed):
     ```
     npm install -g @angular/cli
     ```
   - Install frontend dependencies:
     ```
     npm install
     ```
   - Update the backend URL in `src/environments/environment.ts`:
     ```
     export const environment = {
       production: false,
       backendUrl: 'http://localhost:5000', // Update this URL with your Flask app's URL
     };
     ```
   - Save the file after making changes.

6. Run the Angular app:

   ```
   npm run ng serve
   ```

   - The app should now be accessible at `http://localhost:4200`.

7. Open your browser and navigate to `http://localhost:4200` to see the Bite Book App in action.

## API Endpoints

The following are the API endpoints available in Rising Genius:

- `POST /api/login`: Login already existing user.
- `POST /api/register`: Register a new user.
- `POST /api/chat`: generate response for user query.
- `GET /api/conversation/user`: retrieve user's saved conversation.
- `POST /api/conversation/user`: create a new conversation.
- `PUT /api/conversation/user`: update existing user's conversation.



## Screenshots

![Screenshot 1](./path/to/screenshot1.png)
*Description of the first page screenshot.*

![Screenshot 2](./path/to/screenshot2.png)
*Description of the second page screenshot.*

![Screenshot 3](./path/to/screenshot3.png)
*Description of the third page screenshot.*

Feel free to explore Rising Genius, ask questions, and receive intelligent advice tailored to your parenting needs. We hope this app becomes your go-to companion on your parenting journey!

## Contributions

Contributions to Rising Genius are welcome! If you encounter any issues, have feature requests, or want to improve the app, please feel free to open a pull request or submit an issue on the repository.
