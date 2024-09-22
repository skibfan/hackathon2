-- CREATE TABLE IF NOT EXISTS weatherapp
-- (
--     id serial NOT NULL PRIMARY KEY,
    
    
--     first_name character varying(255) NOT NULL,
--     last_name character varying(255) NOT NULL,
--     email character varying(255) NOT NULL UNIQUE,
--     username character varying(255) NOT NULL UNIQUE,
--     password character varying(255) NOT NULL,
--     favorites character varying(255) DEFAULT NULL
    
-- );


-- CREATE TABLE IF NOT EXISTS weatherapp
-- (
--     id serial NOT NULL PRIMARY KEY,
--     email character varying(255) NOT NULL UNIQUE,
--     username character varying(255) NOT NULL UNIQUE,
--     first_name character varying(255) NOT NULL,
--     last_name character varying(255) NOT NULL,
--     favorites character varying(255) DEFAULT NULL,
--     password character varying(255) NOT NULL
-- );


CREATE TABLE IF NOT EXISTS weatherapp
(
    id serial NOT NULL PRIMARY KEY,
    email character varying(255) NOT NULL UNIQUE,
    username character varying(255) NOT NULL UNIQUE,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    favorites character varying(255) DEFAULT NULL
    
);
