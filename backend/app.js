const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

// Usa CORS middleware para permitir las solicitudes de origen cruzado
app.use(cors());

// Endpoint para obtener géneros
app.get('/genres', async (req, res) => {
    const api_key = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while trying to retrieve genres.' });
    }
});

// Endpoint para descubrir películas
app.get('/discover/movie', async (req, res) => {
    const api_key = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${req.query.genre}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while trying to discover movies.' });
    }
});

// Endpoint para obtener información de una película específica
app.get('/movie/:id', async (req, res) => {
    const api_key = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `An error occurred while trying to retrieve info for movie id ${req.params.id}.` });
    }
});

// Inicializar el servidor
app.listen(3000, () => {
    console.log('El servidor está escuchando en el puerto 3000');
});
