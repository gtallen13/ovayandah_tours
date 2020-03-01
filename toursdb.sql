create database toursdb;
use toursdb;

create table tipo_usuario
(
	ID int auto_increment primary key not null,
    nombre_tipo varchar (1) not null
);

insert into tipo_usuario (id, nombre_tipo) 
values
(1, 'A'),
(2, 'E'),
(3, 'U');

create table clientes
(
	id int auto_increment not null,
    username varchar (20) not null,
    email varchar(30) not null,
    contra varchar (20) not null,
    primer_nombre varchar(20) not null,
    primer_apellido varchar (20) not null,
    telefono varchar (15) not null,
	tipo_usuario_id int not null,
    primary key (id, username),
    foreign key (tipo_usuario_id) references tipo_usuario(ID)
);

create table posiciones 
(
	id int auto_increment primary key not null,
    nombre varchar(1)
);

insert into posiciones (id, nombre)
values
(1, 'Administrativo'),
(2, 'Tour Guide'),
(3, 'Transportista');

create table empleados
(
	id int auto_increment not null,
    username varchar(20) not null,
    contra varchar(20) not null,
    primer_nombre varchar(20) not null,
    primer_apellido varchar(20) not null,
    telefono varchar (15) not null,
    email varchar(30) not null,
    id_posicion int not null,
    tipo_usuario_id int not null,
    primary key (id, username),
    foreign key (tipo_usuario_id) references tipo_usuario(id)
);


create table departamentos 
(
	id int auto_increment primary key not null,
    nombre varchar(20) not null
);


create table municipio
(
	id int auto_increment primary key not null,
    nombre varchar(20) not null,
    id_departamento int not null,
    foreign key (id_departamento) references departamentos(id)
);


create table ubicaciones
(
	id int auto_increment primary key not null,
    nombre varchar(25) not null,
    id_municipio int not null,
    foreign key (id_municipio) references municipio(id)
);

create table reservaciones 
(
	id int auto_increment primary key not null,
    fecha_tour datetime	not null,
    cantidad_turistas int not null,
    precio_total int not null,
    fecha_creacion datetime not null,
    id_cliente int not null,
    ubicacion_id int not null,
    foreign key (ubicacion_id) references ubicaciones
);
create table tours
(
	id int auto_increment primary key not null,
    reservacion_id int not null,
    empleados_id int not null,
    foreign key (reservacion_id) references reservaciones(id),
    foreign key (empleados_id) references empleados(id)
);


