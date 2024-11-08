const form = document.getElementById('postForm');
const postsDiv = document.getElementById('posts-container');

document.addEventListener('DOMContentLoaded', async () => {
    const postsDiv = document.getElementById('posts-container');

    async function fetchPosts() {
        try {
            const response = await fetch('/api/posts');
            const posts = await response.json();

            postsDiv.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('paradigm-card'); // Usamos el mismo estilo de las paradigmas
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <span class="post-date">${new Date(post.id).toLocaleDateString()}</span>
                `;
                postsDiv.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error al obtener los posts:', error);
        }
    }

    await fetchPosts();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    console.log("Datos a enviar:", { title, content });

    if (!title || !content) {
        alert('Por favor, completa todos los campos');
        return;
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            form.reset();
            fetchPosts();
        } else {
            console.error('Error al crear el post:', response);
        }
    } catch (error) {
        console.error('Error al enviar el post:', error);
    }
});

fetchPosts();
