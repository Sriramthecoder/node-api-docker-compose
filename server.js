// server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error: ", err));

// Sample data route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// API route that interacts with MongoDB
app.get('/api/data', async (req, res) => {
  const data = await mongoose.connection.db.collection('mycollection').find({}).toArray();
  res.json(data);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
