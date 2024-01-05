const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors());

// Other middleware
app.use(bodyParser.json());

// MongoDB connection string and database/collection names
const mongoConnectionString = 'mongodb://localhost:27017/wordcountdb';
const collectionName = 'word_counts';

app.post('/storeWordCount', async (req, res) => {
  try {
    const count = req.body.count;

    // Connect to MongoDB
    const client = await MongoClient.connect(mongoConnectionString, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection(collectionName);

    // Insert the word count into MongoDB as a document
    const result = await collection.insertOne({ count });

    // Close the MongoDB connection
    client.close();

    // Respond with success
    const insertedObjectId = result.insertedId.toString(); // Convert ObjectId to string
    res.json({ success: true, insertedObjectId });

    // Log a console message with the ObjectId
    console.log(`Word count added to MongoDB with ObjectId: ${insertedObjectId}`);
  } catch (error) {
    console.error('Error storing word count in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
