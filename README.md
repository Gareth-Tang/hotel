CREATE DATABASE hotel_db;
USE hotel_db;

CREATE TABLE hotel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    star_rating TINYINT CHECK (star_rating BETWEEN 1 AND 5),
    has_pool BOOLEAN
);

INSERT INTO hotel (name, location, star_rating, has_pool) VALUES
('阳光酒店', '北京市朝阳区', 4, true),
('海景度假村', '三亚市海棠湾', 5, true),
('城市便捷酒店', '上海市静安区', 3, false),
('山林小屋', '杭州市西湖区', 4, false),
('豪华国际酒店', '广州市天河区', 5, true);



select * from hotel
