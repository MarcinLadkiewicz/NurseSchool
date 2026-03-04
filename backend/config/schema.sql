CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL, 
    email VARCHAR(150) NOT NULL UNIQUE, 
    password_hash VARCHAR(255) NOT NULL, 
    rol VARCHAR(20) NOT NULL CHECK (rol IN('enfermero', 'padre', 'direccion')),
    token_fcm VARCHAR(255) DEFAULT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alumnos (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellidos VARCHAR (100) NOT NULL, 
    curso VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE,
    padre_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS atenciones (
    id SERIAL PRIMARY KEY,
    alumno_id INT NOT NULL REFERENCES alumnos(id),
    enfermero_id INT NOT NULL REFERENCES usuarios(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255) NOT NULL,
    actuacion TEXT NOT NULL,
    observaciones TEXT,
    archivo_adjunto VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alergias (
    id SERIAL PRIMARY KEY, 
    alumno_id INT NOT NULL REFERENCES alumnos(id),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN('alimentaria', 'medicamentosa')),
    descripcion VARCHAR(255) NOT NULL,
    severidad VARCHAR(20) NOT NULL CHECK (severidad IN('alta', 'media', 'baja')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patologias (
    id SERIAL PRIMARY KEY,
    alumno_id INT NOT NULL REFERENCES alumnos(id),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    informe_adjunto VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);