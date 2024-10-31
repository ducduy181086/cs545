-- Insert sample users
INSERT INTO users (name) VALUES
 ('Alice'),
 ('Bob'),
 ('Charlie'),
 ('David'),
 ('Eve'),
 ('Frank'),
 ('Grace'),
 ('Hannah'),
 ('Isaac'),
 ('Jane');

-- Insert sample posts
INSERT INTO post (title, content, author, user_id) VALUES
('Post 1 by Alice', 'Content for post 1', 'Alice', 1),
('Post 2 by Alice', 'Content for post 2', 'Alice', 1),
('Post 1 by Bob', 'Content for post 1', 'Bob', 2),
('Post 2 by Bob', 'Content for post 2', 'Bob', 2),
('Post 1 by Charlie', 'Content for post 1', 'Charlie', 3),
('Post 1 by David', 'Content for post 1', 'David', 4),
('Post 1 by Eve', 'Content for post 1', 'Eve', 5),
('Post 1 by Frank', 'Content for post 1', 'Frank', 6),
('Post 1 by Grace', 'Content for post 1', 'Grace', 7),
('Post 1 by Hannah', 'Content for post 1', 'Hannah', 8);
