create database dbBeautySalon;
use dbBeautySalon;

create table usuarios(
    id int not null,
    nombre_usuario varchar(20) not null,
    password varchar(60) not null,
    nombre_completo varchar(100) not null
)