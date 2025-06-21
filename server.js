const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();

// Use the PORT environment variable for Azure, or default to 3000 for local development
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'backend', 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---

// Redirect root URL to the homepage
app.get('/', (req, res) => {
    res.redirect('/frontend/pages/index.html');
});

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

        // Robustly find the highest existing ID and add 1
        const maxId = db.artworks.reduce((max, art) => art.id > max ? art.id : max, 0);
        newArtwork.id = maxId + 1;

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

// API Endpoint to get a single artwork by ID
app.get('/artworks/:id', async (req, res) => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(data);
        const artwork = db.artworks.find(art => art.id === parseInt(req.params.id));

        if (artwork) {
            res.json(artwork);
        } else {
            res.status(404).json({ message: 'Artwork not found' });
        }
    } catch (error) {
        console.error('Error reading database:', error);
        res.status(500).json({ message: 'Error fetching artwork' });
    }
});

// API Endpoint to update an existing artwork
app.put('/artworks/:id', async (req, res) => {
    try {
        const artworkId = parseInt(req.params.id);
        const updatedData = req.body;
        const data = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(data);

        const artworkIndex = db.artworks.findIndex(art => art.id === artworkId);

        if (artworkIndex !== -1) {
            // Update the artwork, making sure to keep the original ID
            db.artworks[artworkIndex] = { ...db.artworks[artworkIndex], ...updatedData, id: artworkId };
            await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
            res.json(db.artworks[artworkIndex]);
        } else {
            res.status(404).json({ message: 'Artwork not found' });
        }
    } catch (error) {
        console.error('Error updating artwork:', error);
        res.status(500).json({ message: 'Error updating artwork' });
    }
});

// API Endpoint to delete an artwork
app.delete('/artworks/:id', async (req, res) => {
    try {
        const artworkId = parseInt(req.params.id);
        const data = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(data);

        const initialLength = db.artworks.length;
        db.artworks = db.artworks.filter(art => art.id !== artworkId);

        if (db.artworks.length < initialLength) {
            await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
            res.status(204).send(); // 204 No Content is standard for a successful delete
        } else {
            res.status(404).json({ message: 'Artwork not found' });
        }
    } catch (error) {
        console.error('Error deleting artwork:', error);
        res.status(500).json({ message: 'Error deleting artwork' });
    }
});

// --- Static Files ---
// This middleware should be last, to serve frontend files.
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 