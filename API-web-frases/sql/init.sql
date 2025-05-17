CREATE DATABASE IF NOT EXISTS  frases_sql;

USE frases_sql;

CREATE TABLE usuarios(
	usuario_id int UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
	nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
	correo VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) ,
	cel VARCHAR(20) UNIQUE
);

CREATE TABLE frases(
	frase_id int UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
	contenido text NOT NULL ,
	autor VARCHAR(50),
	fecha_publicacion datetime,
	usuario int UNSIGNED NOT NULL ,
	FOREIGN KEY(usuario)
		REFERENCES usuarios(usuario_id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);



