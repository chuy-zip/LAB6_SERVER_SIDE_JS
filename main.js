import express from 'express';
import cors from 'cors';
import { getAllPosts, getPostByID, insertPost, updatePostByID, deletePostByID } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
  });

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await getPostByID(postId);
    res.json(post);
});

app.post('/posts', async (req, res) => {
    const { title, game_description, genre, main_platform, multiplayer_support, online_features } = req.body;
    const result = await insertPost(title, game_description, genre, main_platform, multiplayer_support, online_features);
    res.json(result);
});

app.put('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { title, game_description } = req.body;
    await updatePostByID(postId, title, game_description);
    res.send('Post updated successfully');
});

app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    await deletePostByID(postId);
    res.send('Post deleted successfully');
});
