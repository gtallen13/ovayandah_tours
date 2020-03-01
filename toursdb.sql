create database toursdb;
use toursdb;


create table tipo_usuario
(
	ID int auto_increment primary key not null,
    nombre_tipo varchar (1) not null
);

create table usuarios 
(
	ID int auto_increment primary key not null,
    username varchar(20) not null,
    contra varchar(25) not null,
    tipo_usuario_id int not null,
    foreign key (tipo_usuario_id) references tipo_usuario(ID)
);

