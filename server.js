const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Use the PORT environment variable for Azure, or default to 3000 for local development
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'backend', 'db.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve all static files from the root directory
// This makes your frontend, assets, and scripts folders accessible
app.use(express.static(path.join(__dirname)));

// API Endpoint to get all artworks
app.get('/artworks', async (req, res) => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        const artworks = JSON.parse(data).artworks;
        res.json(artworks);
    } catch (error) {
        console.error('Error reading database:', error);
        res.status(500).json({ message: 'Error fetching artworks' });
    }
});

// API Endpoint to add a new artwork
app.post('/artworks', async (req, res) => {
    try {
        const newArtwork = req.body;

        // Read the entire database
        const data = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(data);

        // Add an ID to the new artwork (simple implementation)
        const lastId = db.artworks.length > 0 ? db.artworks[db.artworks.length - 1].id : 0;
        newArtwork.id = lastId + 1;

        // Add the new artwork to the array
        db.artworks.push(newArtwork);

        // Write the updated database back to the file
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        // Return the newly created artwork
        res.status(201).json(newArtwork);
    } catch (error) {
        console.error('Error saving artwork:', error);
        res.status(500).json({ message: 'Error saving artwork' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 