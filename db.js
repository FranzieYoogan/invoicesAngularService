// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URL and database name
const url = 'mongodb+srv://franzieyoogan2:admin357159@cluster0.guw8a4s.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'invoices';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Define routes
    // Create a new invoice
    app.post('/invoices', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const result = await invoicesCollection.insertOne(req.body);
        res.status(201).json(result.ops[0]);
      } catch (error) {
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

    // Get a specific invoice by ID
    app.get('/invoices/:id', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const invoice = await invoicesCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Update a specific invoice by ID
    app.put('/invoices/:id', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const id = new ObjectId(req.params.id);
        const result = await invoicesCollection.findOneAndUpdate(
          { _id: id },
          { $set: req.body },
          { returnDocument: 'after' }
        );
        if (!result.value) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(result.value);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Delete a specific invoice by ID
    app.delete('/invoices/:id', async (req, res) => {
      const invoicesCollection = db.collection('invoices');
      try {
        const result = await invoicesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(error => console.error('Failed to connect to MongoDB', error));
