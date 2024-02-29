import express from 'express';
import cors from 'cors';
import fs from 'fs'
import { getAllPosts, getPostByID, insertPost, updatePostByID, deletePostByID } from './db.js';

const app = express();
const port = 3000;

// Middleware to log endpoint calls
function logEndpointCalls(req, res, next) {
    const logData = {
        time: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        payload: req.body
    };

    next();

    fs.appendFile('log.txt', JSON.stringify(logData) + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

function handleUnsupportedMethods(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
        return res.status(501).json({ error: 'Method not implemented' });
    }
    next();
}


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use(logEndpointCalls);
app.use(handleUnsupportedMethods);

  app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await getPostByID(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, game_description, genre, main_platform, multiplayer_support, online_features } = req.body;
        const result = await insertPost(title, game_description, genre, main_platform, multiplayer_support, online_features);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, game_description } = req.body;
        const updatedPost = await updatePostByID(postId, title, game_description);
        if (updatedPost) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletionSuccessful = await deletePostByID(postId);
        
        if (deletionSuccessful) {
            res.status(204).send(); // Send 204 if deletion was successful
        } else {
            res.status(404).json({ error: 'Post not found' }); // Send 404 if post was not found
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle other errors
    }
});


app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
  });