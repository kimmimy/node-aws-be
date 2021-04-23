-- CREATE table products (
-- 	id uuid DEFAULT uuid_generate_v4(),
-- 	title varchar(255) NOT NULL,
-- 	description varchar(1000),
-- 	price integer
-- )

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- insert into products (title, description, price) values
-- 	('Принтер', 'HP 1100', 300),
-- 	('Центрефуга', 'jk-15999', 4300),
-- 	('Дозатор', 'Jo-sd1', 4000),
-- 	('Отчаститель частиц', 'clear-bloom', 9000);

-- ALTER TABLE products ADD CONSTRAINT uniquectm_const UNIQUE (id);

-- CREATE TABLE IF NOT EXISTS stocks (
--  	product_id uuid NOT NULL,
--  	count integer NOT NULL,
--  	CONSTRAINT fk_product_id
--  	FOREIGN KEY(product_id)
-- 	REFERENCES products(id)
--  	ON DELETE CASCADE
-- 	ON UPDATE CASCADE
-- );

--  INSERT INTO stocks (product_id, count)
--    VALUES (
--      '04448ca6-e6bd-4797-8ad3-ee6c9e3227b4',
--      130
--    ),
--    (
--      'f7fc1c93-6184-4a30-8b6f-635a387296a6',
--      40
--    ),
--    (
--      '07381035-13ef-4799-87c9-e4fadbe0daff',
--      85
--    ),
--    (
--      'acade68b-c0ca-42a0-863f-9b95682e9a18',
--      105
--   )



/*  CREATE table products (
	id uuid DEFAULT uuid_generate_v4(),
	title varchar(255) NOT NULL,
	description varchar(1000),
	price integer
  )
  
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";*/
/*
insert into products (title, description, price) values
	('Принтер', 'HP 1100', 300),
	('Центрефуга', 'jk-15999', 4300),
	('Дозатор', 'Jo-sd1', 4000),
	('Отчаститель частиц', 'clear-bloom', 9000);*/
/*
ALTER TABLE products ADD CONSTRAINT uniquectm_const UNIQUE (id);*/
/*
CREATE TABLE IF NOT EXISTS stocks (
 	product_id uuid NOT NULL,
 	count integer NOT NULL,
 	CONSTRAINT fk_product_id
 	FOREIGN KEY(product_id)
	REFERENCES products(id)
 	ON DELETE CASCADE
	ON UPDATE CASCADE
);*/


--  INSERT INTO stocks (product_id, count)
--    VALUES (
--      '04448ca6-e6bd-4797-8ad3-ee6c9e3227b4',
--      130
--    ),
--    (
--      'f7fc1c93-6184-4a30-8b6f-635a387296a6',
--      40
--    ),
--    (
--      '07381035-13ef-4799-87c9-e4fadbe0daff',
--      85
--    ),
--    (
--      'acade68b-c0ca-42a0-863f-9b95682e9a18',
--      105
--   )