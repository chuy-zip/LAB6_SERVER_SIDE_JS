CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    game_description TEXT NOT NULL,
    genre VARCHAR(100),
    main_platform VARCHAR(100),
    release_date DATE,
    multiplayer_support BOOLEAN,
    online_features BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
