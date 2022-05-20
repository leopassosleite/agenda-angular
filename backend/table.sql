create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(250) NOT NULL,
    status varchar(250) NOT NULL,
    role varchar(20) NOT NULL,
    UNIQUE(email)
);

insert into user(name,contactNumber,email,password,status,role) values ('admin','(51) 99154-6743','leopassos.leite@gmail.com','admin','true','admin');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    primary key (id)
);

create table client(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    company varchar(50),
    contactNumber varchar(20),
    email varchar (50),
    categoryId integer NOT NULL,
    primary key(id)
);