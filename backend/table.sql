create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(250),
    role varchar(20),
    UNIQUE(email)
);

insert into user(name,contactNumber,email,password,status,role) values ('admin','(51) 99154-6743','leopassos.leite@gmail.com','admin','true','admin');