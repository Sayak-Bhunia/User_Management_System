const { app, usersCollection, validateUserInput } = require('./config');
app.post('/users', validateUserInput, async (req, res) => {
  try {
    const userData = {
      ...req.body,
      createdAt: new Date()
    };
    const docRef = await usersCollection.add(userData);
    const user = await docRef.get();
    res.status(201).json({
      id: docRef.id,
      ...user.data()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const snapshot = await usersCollection.get();
    const users = [];
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const doc = await usersCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

app.put('/users/:id', validateUserInput, async (req, res) => {
  try {
    const docRef = usersCollection.doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await docRef.update(req.body);
    const updatedDoc = await docRef.get();
    
    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const docRef = usersCollection.doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await docRef.delete();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});