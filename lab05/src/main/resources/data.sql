-- Insert sample users
INSERT INTO users (email, name, password)
VALUES ('uinan@miu.edu', 'umur', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2'); --123
INSERT INTO users (email, name, password)
VALUES ('john@miu.edu', 'john', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2'); --123
INSERT INTO users (email, name, password)
VALUES ('dean@miu.edu', 'Dean', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2'); --123

-- Insert sample posts
INSERT INTO post (title, content, author, user_id) VALUES
('Post 1 by Alice', 'Content for post 1', 'Alice', 1),
('Post 2 by Alice', 'Content for post 2', 'Alice', 1),
('Post 1 by Bob', 'Content for post 1', 'Bob', 2),
('Post 2 by Bob', 'Content for post 2', 'Bob', 2);

INSERT INTO comment (name, post_id) VALUES
('Review 1', 1);

INSERT INTO roles (role) VALUES ('ADMIN');
INSERT INTO roles (role) VALUES ('CLIENT');

INSERT INTO users_roles(roles_id, user_id) VALUES (1, 1);
INSERT INTO users_roles(roles_id, user_id) VALUES (2, 2);
