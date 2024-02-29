import conn from './conn.js';

export async function insertPost(title, game_description, genre, main_platform, multiplayer_support, online_features) {
    const [result] = await conn.query(
        'INSERT INTO games (title, game_description, genre, main_platform, multiplayer_support, online_features) VALUES (?, ?, ?, ?, ?, ?)',
        [title, game_description, genre, main_platform, multiplayer_support, online_features]
    );
    
    // Get the inserted row by its ID
    const insertedRow = await getPostByID(result.insertId);
    
    return insertedRow;
}

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM games');
    return rows
}

export async function getPostByID(postId) {
    const [rows, fields] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
    return rows.length ? rows[0] : null;
}

export async function updatePostByID(id, title, game_description) {
    await conn.query('UPDATE games SET title = ?, game_description = ? WHERE id = ?', [title, game_description, id]);

    const updatedRow = await getPostByID(id);
    
    return updatedRow;
}

// db.js

export async function deletePostByID(id) {
    const existingPost = await getPostByID(id);
    
    if (!existingPost) {
        throw new Error('Post not found');
    }
    
    await conn.query('DELETE FROM games WHERE id = ?', [id]);
}

