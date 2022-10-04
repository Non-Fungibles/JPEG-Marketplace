CREATE TABLE users(
user_id serial PRIMARY KEY,
username varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL,
money numeric NOT NULL
)

CREATE TABLE nfts(
nft_id SERIAL PRIMARY KEY,
name varchar(255) NOT NULL,
price numeric NOT NULL,
url varchar NOT NULL,
status BOOLEAN NOT NULL,
user_id integer 

) 

ALTER TABLE nfts ADD CONSTRAINT nfts_fk0 FOREIGN KEY (user_id) REFERENCES users(user_id)

ALTER TABLE nfts
  ADD insert_time timestamp default NOW()  
