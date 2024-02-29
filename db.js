import conn from './conn.js';

export async function insertPost(title, game_description, genre, main_platform, multiplayer_support, online_features) {
    const [result] = await conn.query(
        'INSERT INTO games (title, game_description, genre, main_platform, multiplayer_support, online_features) VALUES (?, ?, ?, ?, ?, ?)',
        [title, game_description, genre, main_platform, multiplayer_support, online_features]
    )
    return result
}

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM games');
    return rows
}

export async function getPostByID(id) {
    const [rows] = await conn.query('SELECT * FROM games WHERE id = ?', [id]);
    return rows
}

export async function updatePostByID(id, title, game_description) {
    const [rows] = await conn.query('UPDATE games SET title = ?, game_description = ? WHERE id = ?', [title, game_description, id]);
    return rows
}

export async function deletePostByID(id) {
    await conn.query('DELETE FROM games WHERE id = ?', [id])
}
