-- mytable
    create table users(
        id int primary key auto_increment,
        role_id int(11),
        name varchar(120),
        username varchar(255),
        password varchar(255),
        is_active varchar(1),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (role_id) references roles(id)
    )
    create table roles(
        id int primary key auto_increment,
        name varchar(255),
        code int(11),
        status boolean default true,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
    create table customers(
        id int primary key auto_increment,
        name varchar(120),
        tel varchar(18),
        email varchar(120),
        address text,
        description varchar(120),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
    create table category(
        id int primary key auto_increment,
        name varchar(120) not null,
        code int(11) not null,
        description varchar(120),
        status boolean default true,
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    )
    create table products(
        id int primary key auto_increment,
        category_id int(11),
        -- sugar_level_id INT, --add sugar level
        barcode varchar(120),
        name varchar(120),
        brand varchar(120),
        description text,
        qty int(6),
        price DECIMAL(7,2),
        discount DECIMAL(3,2),
        status boolean default true,
        image varchar(255),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (category_id) references category(id),
    )
    create table orders(
        id int primary key auto_increment,
        order_no varchar(120),
        customer_id int(11),
        user_id int(11),
        paid_amount  DECIMAL(7,2),
        payment_method varchar(120),
        remark varchar(120),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (customer_id) references customers(id)
    )
    create table order_items(
        id int primary key auto_increment,
        order_id int(11),
        proudct_id  int(11),
        qty  int(6),
        price DECIMAL(7,2),
        discount DECIMAL(7,2),
        total DECIMAL(7,2),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (order_id) references orders(id),
        foreign key (product_id) references products(id)
    )
    create table invoices(
        id int primary key auto_increment,
        invoice_no varchar(120),
        customer_id int(11),
        invoice_date  varchar(120),
        order_id int(11),
        product_id int(11),
        total_amount DECIMAL(7,2),
        tax_amount decimal(7,2),
        disconnect_amount decimal(7,2),
        payment_method varchar(120),
        paid_date datetime,
        payment_status varchar(120),
        create_by varchar(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        foreign key (order_id) references orders(id),
        foreign key (product_id) references products(id)
    )
    CREATE TABLE permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );
    CREATE TABLE role_permissions (
        role_id INT NOT NULL,
        permission_id INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES roles(id),
        FOREIGN KEY (permission_id) REFERENCES permissions(id)
    );


    -- 1. Sugar Level Reference Table
    CREATE TABLE sugar_level (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level_name VARCHAR(50) NOT NULL UNIQUE
    );

    -- 2. Category Table
    CREATE TABLE category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(120) NOT NULL,
        code INT(11) NOT NULL,
        description VARCHAR(120),
        status BOOLEAN DEFAULT TRUE,
        create_by VARCHAR(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Products Table (added sugar_level_id)
    CREATE TABLE products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category_id INT(11),
        sugar_level_id INT, -- New column
        barcode VARCHAR(120),
        name VARCHAR(120),
        brand VARCHAR(120),
        description TEXT,
        qty INT(6),
        price DECIMAL(7,2),
        discount DECIMAL(3,2),
        status BOOLEAN DEFAULT TRUE,
        image VARCHAR(255),
        create_by VARCHAR(120),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES category(id),
        FOREIGN KEY (sugar_level_id) REFERENCES sugar_level(id)
    );

    -- 4. Product Detail Table
    CREATE TABLE product_detail (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        key_name VARCHAR(100) NOT NULL,
        value TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

-- 1. Product Type Table (optional but useful)
CREATE TABLE product_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Category Table
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    code INT(11) NOT NULL,
    description VARCHAR(120),
    status BOOLEAN DEFAULT TRUE,
    create_by VARCHAR(120),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Sugar Level Table
CREATE TABLE sugar_level (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL UNIQUE
);

-- 4. Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    product_type_id INT,
    sugar_level_id INT,
    barcode VARCHAR(120),
    name VARCHAR(120),
    brand VARCHAR(120),
    description TEXT,
    qty INT(6),
    price DECIMAL(7,2),
    discount DECIMAL(3,2),
    status BOOLEAN DEFAULT TRUE,
    image VARCHAR(255),
    create_by VARCHAR(120),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (product_type_id) REFERENCES product_type(id),
    FOREIGN KEY (sugar_level_id) REFERENCES sugar_level(id)
);

-- 5. Product Detail Table
CREATE TABLE product_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    key_name VARCHAR(100) NOT NULL,
    value TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
-- Iced Coffee
INSERT INTO product_details (product_id, key_name, value) VALUES
(1, 'Flavor', 'Mocha'),
(1, 'Packaging', 'Plastic Cup');

-- Hot Espresso
INSERT INTO product_details (product_id, key_name, value) VALUES
(2, 'Size', 'Small'),
(2, 'Intensity', 'Strong');

-- Green Tea
INSERT INTO product_details (product_id, key_name, value) VALUES
(3, 'Type', 'Green'),
(3, 'Sweetened', 'No');

-- Milk Tea
INSERT INTO product_details (product_id, key_name, value) VALUES
(4, 'Topping', 'Boba'),
(4, 'Sweetened', 'Yes');

-- Coca-Cola
INSERT INTO product_details (product_id, key_name, value) VALUES
(5, 'Size', 'Can'),
(5, 'Volume', '330ml');

-- Orange Juice
INSERT INTO product_details (product_id, key_name, value) VALUES
(7, 'Fruit Type', 'Orange'),
(7, 'Pulp', 'With Pulp');

-- Milk Cream Jelly
INSERT INTO product_details (product_id, key_name, value) VALUES
(9, 'Texture', 'Soft'),
(9, 'Flavor', 'Vanilla');

-- Fresh Coconut
INSERT INTO product_details (product_id, key_name, value) VALUES
(11, 'Type', 'Young'),
(11, 'Packaging', 'Natural Shell');

-- Mango Smoothie
INSERT INTO product_details (product_id, key_name, value) VALUES
(13, 'Fruit', 'Mango'),
(13, 'Sweetener', 'Honey');

-- Potato Chips
INSERT INTO product_details (product_id, key_name, value) VALUES
(15, 'Flavor', 'Sour Cream & Onion'),
(15, 'Packaging', 'Bag');

-- Apple
INSERT INTO product_details (product_id, key_name, value) VALUES
(18, 'Variety', 'Fuji'),
(18, 'Weight', '150g average');


INSERT INTO product_type (name) VALUES
('Beverage'),
('Packaged Food');


CREATE TABLE `roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) CHARACTER  NOT NULL,
    `permissions` json DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `role_id` int DEFAULT NULL,
    `name` varchar(120) CHARACTER  DEFAULT NULL,
    `username` varchar(120) CHARACTER  DEFAULT NULL,
    `password` varchar(120) CHARACTER  DEFAULT NULL,
    `is_active` tinyint(1) DEFAULT '1',
    `create_by` varchar(120) CHARACTER  DEFAULT NULL,
    `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `role_id` (`role_id`),
    CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
)
create `permissions`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) CHARACTER  NOT NULL,
    `gorup` varchar(50) CHARACTER  NOT NULL,
    `is_menu` varchar(50) CHARACTER  DEFAULT NULL,
    `route_key` varchar(50) CHARACTER  DEFAULT NULL,
    PRIMARY KEY (`id`)
)


-- disconnect ERD
    alter table products drop foreign key category_id;

    -- show data type create table
    show create table products

    --check table with data type
        DESCRIBE roles;
    -- drop columnalter syntax
    table roles 
    drop column status;

    -- category drop column
    alter table category drop column code;
    
    --modify column syntax
    alter table roles modify column code varchar(120);

    --update syntax
    update roles set code= 'admin' where id=1;
    -- add foreign key syntax
    alter table orders add foreign key (product_id) references products(id);
    -- add column syntax
    alter table suppliers add column code varchar(12);
    -- rename table syntax
    alter table order_items rename order_detail;
    
    -- rename column syntax
    alter table roles change column code permission varchar(120)