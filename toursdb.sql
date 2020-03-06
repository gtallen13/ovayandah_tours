drop database if exists toursdb;
create database toursdb;
use toursdb;
create table tipo_usuario
(
	ID int auto_increment primary key not null,
    nombre_tipo varchar (15) not null
);

create table clientes
(
	id int auto_increment primary key not null,
    email varchar(30) not null,
    primer_nombre varchar(20) not null,
    primer_apellido varchar (20) not null,
    telefono varchar (15) not null,
    unique (email)
);

create table posiciones 
(
	id int auto_increment primary key not null,
    nombre varchar(15) not null
);
create table empleados
(
	id int auto_increment primary key not null,
    username varchar(20) not null,
    contra varchar(20) not null,
    primer_nombre varchar(20) not null,
    primer_apellido varchar(20) not null,
    telefono varchar (15) not null,
    email varchar(30) not null,
    id_posicion int not null,
    tipo_usuario_id int not null,
    unique (username, email),
    foreign key (tipo_usuario_id) references tipo_usuario(id),
    foreign key (id_posicion) references posiciones (id)
);


create table departamentos 
(
	id int auto_increment primary key not null,
    nombre varchar(20) not null
);


create table municipios
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
    foreign key (id_municipio) references municipios(id)
);

 create table tours
 (
	ID int auto_increment primary key not null,
	nombre varchar(25) not null,
	precio decimal(8,2) not null,
    descripcion varchar (100) not null
 );
 
 
 create table tours_ubicaciones
 (
	id int auto_increment primary key not null,
    id_tours int not null,
    id_ubicaciones int not null,
    foreign	key (id_tours) references tours (id),
    foreign key (id_ubicaciones) references ubicaciones (id)
 );

create table reservaciones 
(
	id int auto_increment primary key not null,
    fecha_inicio_tour datetime	not null,
    fecha_final_tour datetime not null,
    cantidad_turistas int not null,
    precio_total decimal (8,2) not null,
    fecha_creacion datetime not null,
    id_clientes int not null,
    ubicaciones_id int not null,
    tours_id int not null,
    foreign key (tours_id) references tours (id),
    foreign key (ubicaciones_id) references ubicaciones(id),
    foreign key (id_clientes) references clientes(id)
);
create table empleados_reservaciones
(
	id int auto_increment primary key not null,
    reservacion_id int not null,
    empleados_id int not null,
    foreign key (reservacion_id) references reservaciones(id),
    foreign key (empleados_id) references empleados(id)
);


 
 


