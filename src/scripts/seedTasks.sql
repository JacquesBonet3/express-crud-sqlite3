CREATE TABLE IF NOT EXISTS tasks (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     title TEXT NOT NULL,
                                     completed INTEGER NOT NULL DEFAULT 0
);

INSERT INTO tasks (title, completed)
VALUES
    ('Task1', 0),
    ('Task2', 0),
    ('Task3', 0),
    ('Task4', 0),
    ('Task5', 0);
