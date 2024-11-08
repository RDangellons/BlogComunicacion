const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Almacenamiento temporal en memoria
let posts = [];

// Ruta para obtener los posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Ruta para crear un nuevo post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Título y contenido son requeridos' });
    }

    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
