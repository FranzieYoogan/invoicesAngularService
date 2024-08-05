const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb+srv://franzieyoogan2:admin357159@cluster0.guw8a4s.mongodb.net/';
const dbName = 'invoices';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Define routes
    app.post('/invoices', async (req, res) => {
      console.log('Request Body:', req.body);
      const invoicesCollection = db.collection('invoices');
      try {
        const result = await invoicesCollection.insertOne(req.body);
        console.log('Insert Result:', result);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        console.error('Error inserting item:', error);
        res.status(400).json({ message: error.message });
      }
    });

    // Get all invoices
    app.get('/invoices', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const invoices = await invoicesCollection.find().toArray();
        res.status(200).json(invoices);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Get a user by ID
    app.get('/invoices/:id', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const user = await invoicesCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.put('/invoices/:id', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const result = await invoicesCollection.findOneAndUpdate(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body },
          { returnOriginal: false }
        );
        if (!result.value) return res.status(404).json({ message: 'invoices not found' });
        res.status(200).json(result.value);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Delete a user
    app.delete('/invoices/:id', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const result = await invoicesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

  

 

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(error => console.error(error));