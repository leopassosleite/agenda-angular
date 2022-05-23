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

create table deadline(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    primary key (id)
);
insert into status(name) values ('contatado');
insert into status(name) values ('pendente');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    primary key (id)
);

insert into category(name) values ('leves');
insert into category(name) values ('médios');
insert into category(name) values ('pesados');

create table status(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    primary key(id)
);

create table statusProduct(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    primary key(id)
);
insert into statusProduct(name) values ('vendido');
insert into statusProduct(name) values ('manutenção');
insert into statusProductId(name) values ('removido');

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    model varchar (100) NOT NULL,
    year varchar (4) NOT NULL,
    brand varchar (100) NOT NULL,
    description varchar(255),
    price Float NOT NULL,
    statusProductId varchar(20),
    primary key(id)
);


create table client(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    company varchar(50) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    email varchar (50) NOT NULL,
    city varchar (50) NOT NULL,
    description varchar (255) NOT NULL,
    deadlineId integer NOT NULL,
    productId integer NOT NULL,
    primary key(id)
);

create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(20) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar (100) NOT NULL,
    primary key(id)
);
