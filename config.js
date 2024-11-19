const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = {
  //secrets
};

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const usersCollection = db.collection('users');

const validateUserInput = (req, res, next) => {
  const { name, email, age, weight, height, healthGoals } = req.body;
  if (!name || !email || !age || !weight || !height || !healthGoals) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (typeof age !== 'number' || age < 0 || age > 120) {
    return res.status(400).json({ error: 'Invalid age' });
  }
  
  if (typeof weight !== 'number' || weight <= 0) {
    return res.status(400).json({ error: 'Invalid weight' });
  }
  
  if (typeof height !== 'number' || height <= 0) {
    return res.status(400).json({ error: 'Invalid height' });
  }
  next();
};

module.exports = { app, usersCollection, validateUserInput };
