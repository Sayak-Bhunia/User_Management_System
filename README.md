# User Profile API with Node.js and Firestore

A robust RESTful API for managing user profiles using Node.js, Express, and Firebase Cloud Firestore.

## 📋 Project Overview

This API provides comprehensive CRUD (Create, Read, Update, Delete) operations for managing user profiles with robust error handling and input validation.

## 🛠 Prerequisites

- Node.js (v14.0.0+)
- npm
- Firebase Account
- Git

## 📂 Project Structure

```
user-profile-api/
├── config.js      # Firebase configuration
├── index.js       # API routes and server setup
├── .env           # Environment variables
├── index.html
├── tailwind.config.js
├── .gitignore
└── package.json
```

## 🚀 Setup Instructions

### Firebase Configuration

1. Create a Firebase project
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Create new project
   - Enable Firestore Database

2. Generate Service Account
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

### Project Installation

```bash
# Clone repository
git clone <repository-url>
cd user-profile-api

# Install dependencies
npm install express firebase-admin dotenv cors

# Create .env file
touch .env
```

### Environment Configuration

Add the following to `.env`:
```env
PORT=3000
NODE_ENV=development

# Firebase Credentials
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
```

### Running the Application

```bash
# Start the server
node index.js
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Create user profile |
| GET | /api/users | List all users |
| GET | /api/users/:id | Get specific user |
| PUT | /api/users/:id | Update user profile |
| DELETE | /api/users/:id | Delete user profile |

### Request Body Example

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

## 🧪 Testing the API

### cURL Testing

**Create User:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "weight": 75.5,
    "height": 180,
    "healthGoals": "Lose weight"
  }'
```

**Get All Users:**
```bash
curl http://localhost:3000/api/users
```

### Postman Testing
1. Open Postman
2. Create new request
3. Set HTTP method
4. Enter URL
5. Add JSON body for POST/PUT
6. Send request

### Node.js with Axios

```javascript
const axios = require('axios');

// Create User
axios.post('http://localhost:3000/api/users', {
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  weight: 75.5,
  height: 180,
  healthGoals: "Lose weight"
});
```

## 🔒 Security Features

- Input validation
- Environment-based configuration
- Secure Firebase integration
- CORS protection
- Error handling middleware

## 📦 Dependencies

- express: Web framework
- firebase-admin: Firebase SDK
- dotenv: Environment management
- cors: Cross-origin handling

## 🐛 Troubleshooting

1. Verify Firebase credentials
2. Check `.env` configuration
3. Ensure all dependencies installed
4. Review server console logs

## 📝 Error Handling

- Validates all user inputs
- Provides meaningful error responses
- Logs server-side errors
- Handles database connection issues

## 🔧 Common Fixes

- Regenerate Firebase private key
- Check network connectivity
- Verify Node.js version compatibility

## 📄 License

MIT License

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📞 Support

For issues, create a GitHub issue or contact support@example.com
