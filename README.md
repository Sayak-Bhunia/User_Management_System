# User Profile API with Node.js and Firestore

A RESTful API built with Node.js and Express that manages user profiles using Firebase Cloud Firestore as the database.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (Node Package Manager)
- Git
- A Google account for Firebase

## Project Structure

```
user-profile-api/
├── config.js      # Firebase configuration
├── index.js       # API routes and server setup
├── .env           # Environment variables
├── .gitignore
└── package.json
```

## Setup Instructions

### 1. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
   - Go to Firestore Database in the left sidebar
   - Click "Create Database"
   - Choose "Start in production mode"
   - Select a location closest to your users
4. Get your Firebase credentials:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file (you'll need this later)

### 2. Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd user-profile-api
```

2. Install dependencies:
```bash
npm install express firebase-admin dotenv cors
```

3. Create a `.env` file in the root directory with the following contents:
```env
PORT=3000
NODE_ENV=development

# Firebase Config (fill these with your Firebase credentials)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
```

### 3. Running the Application

Start the server:
```bash
node index.js
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Create a new user profile |
| GET | /api/users | Retrieve all users |
| GET | /api/users/:id | Retrieve a specific user |
| PUT | /api/users/:id | Update a user profile |
| DELETE | /api/users/:id | Delete a user profile |

### Request Body Format (POST/PUT)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "weight": 75.5,
  "height": 180,
  "healthGoals": "Lose weight and build muscle"
}
```

## Dependencies

- express: Web framework for Node.js
- firebase-admin: Firebase Admin SDK
- dotenv: Environment variables management
- cors: Cross-Origin Resource Sharing middleware

## Error Handling

The API includes error handling for:
- Invalid requests
- Missing or invalid fields
- Database errors
- Not found resources

## Security Considerations

1. The `.env` file contains sensitive information - never commit it to version control
2. Firebase credentials should be kept secure
3. Input validation is implemented for all user data
4. CORS is configured to handle cross-origin requests

## Testing the API

You can test the API using tools like:
- cURL
- Postman
- Thunder Client
- Any HTTP client

Example cURL command to create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "weight": 75.5,
    "height": 180,
    "healthGoals": "Lose weight and build muscle"
  }'
```

## License

This project is licensed under the MIT License
