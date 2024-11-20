-- Insert sample users
INSERT INTO users (email, password)
VALUES ('uinan@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2'); --123
INSERT INTO users (email, password)
VALUES ('john@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2'); --123
INSERT INTO users (email, password)
VALUES ('dean@miu.edu', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2'); --123

INSERT INTO roles (role_type) VALUES ('ADMIN');
INSERT INTO roles (role_type) VALUES ('BUYER');
INSERT INTO roles (role_type) VALUES ('SELLER');

INSERT INTO user_roles(role_id, user_id) VALUES (1, 1);
INSERT INTO user_roles(role_id, user_id) VALUES (2, 2);
INSERT INTO user_roles(role_id, user_id) VALUES (3, 3);

INSERT INTO admin (user_id) VALUES (1);
INSERT INTO buyer (user_id) VALUES (2);
INSERT INTO seller (user_id, admin_id) VALUES (3, 1);

INSERT INTO category (name, parent_id) VALUES
('Men', NULL),
('Women', NULL),
('Kids', NULL),
('Shirts', 1),  -- Shirts belongs Men
('Pants', 1),   -- Pants belongs Men
('Dresses', 2), -- Dresses belongs Women
('Jackets', 1); -- Jackets belongs Men

INSERT INTO product (name, description, quantity, price, discount, brand, type, category_id, seller_id, average_rating, review_count, in_stock, is_new_arrival, is_best_seller, material, features, model_year, delivery_options, demographics, usage, occasion)
VALUES
('Nike Men''s Shirt', 'High quality cotton shirt for men', 10, 29.99, 10, 'Nike', 'Shirts', 1, 1, 4.5, 100, true, false, true, 'Cotton', 'Comfortable, Breathable', '2024', 'US, CA', 'Men', 'Casual', 'Casual'),
('Adidas Women''s Pants', 'Stylish pants for women with premium material', 25, 49.99, 20, 'Adidas', 'Pants', 2, 1, 4.7, 120, true, true, true, 'Polyester', 'Comfortable, Stretchable', '2023', 'US, EU', 'Women', 'Casual', 'Casual'),
('Zara Kids Dress', 'Trendy dress for girls, perfect for parties', 30, 39.99, 15, 'Zara', 'Dresses', 3, 1, 4.0, 50, true, false, false, 'Cotton', 'Stylish, Comfortable', '2022', 'US, CA', 'Kids', 'Party', 'Party'),
('H&M Men''s Jacket', 'Warm jacket for men, ideal for winter', 19, 99.99, 25, 'H&M', 'Jackets', 1, 1, 4.8, 150, true, true, false, 'Wool', 'Warm, Stylish', '2023', 'US, EU', 'Men', 'Winter', 'Winter'),
('Adidas Women''s Jacket', 'Lightweight jacket for women, great for spring', 8, 79.99, 10, 'Adidas', 'Jackets', 2, 1, 4.6, 80, true, false, true, 'Polyester', 'Lightweight, Windproof', '2024', 'US, CA', 'Women', 'Spring', 'Casual'),
('Nike Kids Shirt', 'Bright, colorful kids shirt for summer', 32, 19.99, 30, 'Nike', 'Shirts', 3, 1, 4.3, 60, true, false, true, 'Cotton', 'Fun, Comfortable', '2023', 'US, EU', 'Kids', 'Summer', 'Casual');

INSERT INTO product_colors (product_id, colors) VALUES
(1, 'Red'),
(1, 'Blue'),
(2, 'Black'),
(2, 'White'),
(3, 'Pink'),
(3, 'Purple'),
(4, 'Black'),
(4, 'Gray'),
(5, 'Green'),
(5, 'Yellow'),
(6, 'Orange'),
(6, 'Blue');

INSERT INTO product_sizes (product_id, sizes) VALUES
(1, 'M'),
(1, 'L'),
(2, 'S'),
(2, 'M'),
(3, 'S'),
(3, 'M'),
(4, 'M'),
(4, 'L'),
(5, 'M'),
(5, 'L'),
(6, 'S'),
(6, 'M');

INSERT INTO product_payment_options (product_id, payment_options) VALUES
(1, 'Credit Card'),
(1, 'PayPal'),
(2, 'Cash on Delivery'),
(2, 'Credit Card'),
(3, 'PayPal'),
(3, 'Cash on Delivery'),
(4, 'Credit Card'),
(4, 'PayPal'),
(5, 'Cash on Delivery'),
(5, 'Credit Card'),
(6, 'PayPal'),
(6, 'Cash on Delivery');