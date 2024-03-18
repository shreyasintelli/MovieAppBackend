const express = require('express');
const mongoose = require('mongoose');
require('./config'); 
const Movie = require('./moviesSchemas');
const mongodb = require('mongodb');
const cors = require('cors'); 

const app = express();
app.use(express.json());
app.use(cors());

// Create a new movie
app.post('/movies', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const result = await movie.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a movie
app.put('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a movie
app.delete('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Movie.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search for movies by name or category
app.get('/movies/search', async (req, res) => {
    try {
        const { key } = req.query;
        const movies = await Movie.find({
            $or: [
                { name: { $regex: key, $options: 'i' } }, // Case-insensitive search for name
                { category: { $regex: key, $options: 'i' } }, // Case-insensitive search for category
            ],
        });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
