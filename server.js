const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos y procesar JSON
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Función para leer posts de 'posts.json'
function readPosts() {
    try {
        const data = fs.readFileSync('posts.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer posts.json:', error);
        return [];
    }
}

// Ruta para obtener todos los posts
app.get('/api/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// Ruta para crear un nuevo post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;

    // Depuración: Verificar si los datos están llegando correctamente
    console.log('Datos recibidos en el servidor:', req.body);

    if (!title || !content) {
        return res.status(400).json({ message: 'Título y contenido son requeridos' });
    }

    try {
        const posts = readPosts();
        const newPost = { id: Date.now(), title, content };

        posts.push(newPost);

        // Guardar los posts en el archivo
        fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2), 'utf-8');

        console.log('Nuevo post guardado:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error al guardar el post en posts.json:', error);
        res.status(500).json({ message: 'Error al guardar el post' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
