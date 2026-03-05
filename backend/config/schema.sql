-- SCHEMA OF THE DATABASE TO EXEC WHEN DOCKER COMPOSE UP
--docker exec -i nurseschool-db-1 psql -U user -d nurseschool <config/schema.sql



CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(150) NOT NULL UNIQUE, 
    password_hash VARCHAR(255) NOT NULL, 
    rol VARCHAR(20) NOT NULL CHECK (rol IN('enfermero', 'padre', 'direccion')),
    token_fcm VARCHAR(255) DEFAULT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    surname VARCHAR (100) NOT NULL, 
    course VARCHAR(20) NOT NULL,
    birthdate DATE,
    padre_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attentions (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id),
    enfermero_id INT NOT NULL REFERENCES users(id),
    attention_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255) NOT NULL,
    actuation TEXT NOT NULL,
    actuation_description TEXT,
    added_file VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS allergies (
    id SERIAL PRIMARY KEY, 
    student_id INT NOT NULL REFERENCES students(id),
    alergy_type VARCHAR(20) NOT NULL CHECK (alergy_type IN('alimentaria', 'medicamentosa')),
    alergy_description VARCHAR(255) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN('alta', 'media', 'baja')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pathologys (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id),
    pathology_name VARCHAR(100) NOT NULL,
    pathology_description TEXT,
    added_file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);