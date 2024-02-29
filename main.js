import express from 'express';
import cors from 'cors';
import { getAllPosts, getPostByID, insertPost, updatePostByID, deletePostByID } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
  });

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
        await deletePostByID(postId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

