-- ==========================================
-- SEED DATA - NurseSchool
-- Ejecutar después de schema.sql
-- ==========================================

-- ==========================================
-- studentS (20)
-- Hijos del padre (id=2): students 1-5
-- Resto: padre_id=2 también para simplificar
-- ==========================================

INSERT INTO students (name, surname, course, birthdate, padre_id) VALUES
('Lucas', 'Garcia Ruiz', '1A', '2016-03-15', 2),
('Sofia', 'Garcia Ruiz', '3B', '2014-07-22', 2),
('Pablo', 'Garcia Ruiz', '5A', '2012-11-08', 2),
('Martina', 'Garcia Ruiz', '2B', '2015-05-30', 2),
('Hugo', 'Garcia Ruiz', '4A', '2013-09-12', 2),
('Valeria', 'Fernandez Lopez', '1B', '2016-01-20', 2),
('Daniel', 'Sanchez Torres', '2A', '2015-08-14', 2),
('Emma', 'Romero Diaz', '3A', '2014-04-03', 2),
('Alejandro', 'Moreno Gil', '4B', '2013-06-25', 2),
('Carmen', 'Jimenez Ruiz', '5B', '2012-12-17', 2),
('Adrian', 'Alvarez Sanz', '1A', '2016-02-28', 2),
('Lucia', 'Molina Castro', '2B', '2015-10-05', 2),
('Diego', 'Ortega Vega', '3A', '2014-09-19', 2),
('Noa', 'Delgado Marin', '4A', '2013-03-07', 2),
('Iker', 'Ramos Herrera', '5A', '2012-08-23', 2),
('Abril', 'Navarro Flores', '1B', '2016-06-11', 2),
('Leo', 'Torres Iglesias', '2A', '2015-12-01', 2),
('Chloe', 'Dominguez Perez', '3B', '2014-02-14', 2),
('Marco', 'Gutierrez Leon', '4B', '2013-07-30', 2),
('Vega', 'Vazquez Reyes', '5B', '2012-04-09', 2);

-- ==========================================
-- ALERGIAS (12 students con alergias, 8 sin)
-- ==========================================

-- Lucas (1) - alergia alimentaria grave
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(1, 'alimentaria', 'Alergia a los frutos secos (cacahuetes, nueces)', 'alta');

-- Sofia (2) - dos alergias
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(2, 'medicamentosa', 'Alergia a la penicilina', 'alta'),
(2, 'alimentaria', 'Intolerancia a la lactosa', 'media');

-- Pablo (3) - sin alergias

-- Martina (4) - alergia leve
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(4, 'alimentaria', 'Alergia al gluten (celiaca)', 'alta');

-- Hugo (5) - sin alergias

-- Valeria (6) - alergia medicamentosa
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(6, 'medicamentosa', 'Alergia al ibuprofeno', 'media');

-- Daniel (7) - sin alergias

-- Emma (8) - alergia alimentaria
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(8, 'alimentaria', 'Alergia al huevo', 'media');

-- Alejandro (9) - sin alergias

-- Carmen (10) - dos alergias
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(10, 'alimentaria', 'Alergia al marisco', 'alta'),
(10, 'medicamentosa', 'Alergia a la amoxicilina', 'media');

-- Adrian (11) - alergia leve
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(11, 'alimentaria', 'Alergia a la fresa', 'baja');

-- Lucia (12) - sin alergias

-- Diego (13) - alergia medicamentosa
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(13, 'medicamentosa', 'Alergia al paracetamol', 'alta');

-- Noa (14) - sin alergias

-- Iker (15) - alergia alimentaria
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(15, 'alimentaria', 'Alergia a la proteina de la leche', 'media');

-- Abril (16) - sin alergias
-- Leo (17) - sin alergias

-- Chloe (18) - alergia leve
INSERT INTO allergies (student_id, alergy_type, alergy_description, severity) VALUES
(18, 'alimentaria', 'Alergia al kiwi', 'baja');

-- Marco (19) - sin alergias
-- Vega (20) - sin alergias

-- ==========================================
-- PATOLOGIAS (8 students con patologias)
-- ==========================================

INSERT INTO pathologys (student_id, pathology_name, pathology_description) VALUES
(1, 'Asma', 'Asma leve diagnosticada en 2020. Usa inhalador de rescate Ventolin.'),
(2, 'Dermatitis atopica', 'Brotes frecuentes en brazos y piernas. Tratamiento con crema hidratante y corticoides topicos.'),
(4, 'Enfermedad celiaca', 'Diagnosticada en 2018. Dieta estricta sin gluten.'),
(6, 'TDAH', 'Diagnosticado en 2022. Medicacion diaria con metilfenidato 10mg.'),
(8, 'Diabetes tipo 1', 'Diagnosticada en 2021. Bomba de insulina. Control de glucemia antes del recreo.'),
(10, 'Epilepsia', 'Crisis parciales controladas con levetiracetam. Protocolo de actuacion en secretaria.'),
(13, 'Migrana cronica', 'Episodios frecuentes 2-3 veces al mes. Evitar exposicion solar prolongada.'),
(15, 'Soplo cardiaco', 'Soplo inocente detectado en revision. Sin restriccion deportiva. Revision anual con cardiologo.');

-- ==========================================
-- ATENCIONES (2 por student = 40 total)
-- ==========================================

INSERT INTO attentions (student_id, enfermero_id, attention_date, reason, actuation, actuation_description) VALUES
-- Lucas (1)
(1, 1, '2025-01-15 09:30:00', 'Dolor de cabeza', 'Reposo en enfermeria', 'Se le dio agua y reposo 30 minutos. Mejoro y volvio a clase.'),
(1, 1, '2025-02-20 11:15:00', 'Crisis de asma leve', 'Administracion de Ventolin', 'Dos puffs de Ventolin. Se notifico a los padres. Mejoro en 15 minutos.'),

-- Sofia (2)
(2, 1, '2025-01-22 10:00:00', 'Erupcion cutanea', 'Aplicacion de crema hidratante', 'Brote de dermatitis en brazo derecho. Se aplico crema y se aviso a los padres.'),
(2, 1, '2025-03-01 12:30:00', 'Dolor abdominal', 'Reposo y observacion', 'Posible ingesta accidental de lactosa en el comedor. Se observo 1 hora.'),

-- Pablo (3)
(3, 1, '2025-01-10 08:45:00', 'Golpe en la rodilla', 'Aplicacion de hielo', 'Caida en el patio. Sin herida abierta. Hielo 15 minutos.'),
(3, 1, '2025-02-28 13:00:00', 'Fiebre 37.8', 'Llamada a los padres', 'Se le tomo la temperatura. 37.8C. Se aviso a los padres para recogida.'),

-- Martina (4)
(4, 1, '2025-01-18 09:15:00', 'Malestar general', 'Reposo y control', 'Se quejaba de cansancio. Reposo 20 minutos. Volvio a clase.'),
(4, 1, '2025-03-05 10:45:00', 'Reaccion al gluten', 'Observacion y aviso padres', 'Posible contaminacion cruzada en comedor. Dolor abdominal leve.'),

-- Hugo (5)
(5, 1, '2025-02-03 11:30:00', 'Herida en la mano', 'Limpieza y vendaje', 'Corte superficial con papel. Se limpio con suero y se puso tirita.'),
(5, 1, '2025-02-14 09:00:00', 'Dolor de oido', 'Derivacion al medico', 'Dolor persistente oido izquierdo. Se recomendo visita al pediatra.'),

-- Valeria (6)
(6, 1, '2025-01-25 10:30:00', 'Golpe en la frente', 'Aplicacion de hielo', 'Chichon leve por golpe con companero. Hielo y observacion.'),
(6, 1, '2025-03-02 14:00:00', 'Dificultad de concentracion', 'Registro y seguimiento', 'Profesora reporta dificultad. Se reviso medicacion TDAH con padres.'),

-- Daniel (7)
(7, 1, '2025-01-30 09:45:00', 'Sangrado nasal', 'Presion y hielo', 'Epistaxis espontanea. Presion 10 minutos. Cedio sin problemas.'),
(7, 1, '2025-02-18 12:00:00', 'Dolor de estomago', 'Reposo', 'Malestar tras el almuerzo. Reposo 30 minutos. Mejoro.'),

-- Emma (8)
(8, 1, '2025-01-12 10:15:00', 'Control de glucemia', 'Medicion y registro', 'Glucemia pre-recreo: 145 mg/dl. Dentro de rango. Sin actuacion.'),
(8, 1, '2025-02-25 11:00:00', 'Hipoglucemia leve', 'Administracion de zumo', 'Glucemia: 62 mg/dl. Se dio zumo de naranja. Control a los 15 min: 98 mg/dl.'),

-- Alejandro (9)
(9, 1, '2025-02-05 08:30:00', 'Vomito', 'Llamada a los padres', 'Vomito en clase. Se aviso a los padres. Recogido a las 9:00.'),
(9, 1, '2025-03-03 10:00:00', 'Esguince tobillo', 'Inmovilizacion y hielo', 'Torcedura jugando al futbol. Hielo, vendaje y aviso a padres.'),

-- Carmen (10)
(10, 1, '2025-01-20 09:00:00', 'Reaccion alergica leve', 'Observacion', 'Habones en brazos tras contacto con material de manualidades. Leve, sin medicacion.'),
(10, 1, '2025-02-12 13:30:00', 'Dolor de cabeza', 'Hidratacion y reposo', 'Cefalea tras educacion fisica. Agua y reposo 20 minutos.'),

-- Adrian (11)
(11, 1, '2025-01-28 11:00:00', 'Picadura de insecto', 'Limpieza y crema', 'Picadura en el brazo en el patio. Limpieza y crema antihistaminica.'),
(11, 1, '2025-02-22 09:30:00', 'Fiebre 38.2', 'Aviso a padres', 'Temperatura elevada. Se aviso para recogida.'),

-- Lucia (12)
(12, 1, '2025-02-01 10:45:00', 'Caida en el patio', 'Limpieza de herida', 'Raspon en rodilla. Limpieza con suero fisiologico y tirita.'),
(12, 1, '2025-03-04 12:15:00', 'Dolor de garganta', 'Observacion', 'Molestia al tragar. Sin fiebre. Se recomendo visita al pediatra.'),

-- Diego (13)
(13, 1, '2025-01-16 14:00:00', 'Episodio de migrana', 'Reposo en oscuridad', 'Migrana con aura. Reposo en enfermeria con luz apagada 45 minutos.'),
(13, 1, '2025-02-27 09:15:00', 'Nauseas', 'Reposo y observacion', 'Nauseas sin vomito. Reposo 30 minutos. Mejoro.'),

-- Noa (14)
(14, 1, '2025-02-07 10:30:00', 'Golpe en el codo', 'Hielo y observacion', 'Golpe contra la puerta. Sin inflamacion aparente. Hielo preventivo.'),
(14, 1, '2025-03-01 11:45:00', 'Mareo', 'Hidratacion y reposo', 'Mareo en clase. Posible deshidratacion. Agua y reposo.'),

-- Iker (15)
(15, 1, '2025-01-14 09:00:00', 'Revision cardiologica', 'Registro de constantes', 'Control rutinario de frecuencia cardiaca. Todo normal.'),
(15, 1, '2025-02-19 12:00:00', 'Dolor de cabeza', 'Hidratacion', 'Cefalea leve. Agua y volvio a clase en 15 minutos.'),

-- Abril (16)
(16, 1, '2025-02-10 08:45:00', 'Conjuntivitis', 'Aviso a padres', 'Ojo izquierdo enrojecido y con secrecion. Se aviso para recogida y visita medica.'),
(16, 1, '2025-03-03 10:30:00', 'Tos persistente', 'Observacion', 'Tos seca sin fiebre. Se registro para seguimiento.'),

-- Leo (17)
(17, 1, '2025-01-23 11:30:00', 'Golpe en la cabeza', 'Hielo y observacion', 'Golpe leve jugando. Sin perdida de conciencia. Hielo y observacion 1 hora.'),
(17, 1, '2025-02-15 09:45:00', 'Dolor abdominal', 'Reposo', 'Dolor tipo colico. Reposo en enfermeria. Mejoro tras 30 minutos.'),

-- Chloe (18)
(18, 1, '2025-02-08 10:00:00', 'Reaccion alergica', 'Observacion y registro', 'Manchas rojas en cara tras comer fruta. Posible reaccion al kiwi del postre.'),
(18, 1, '2025-03-02 13:00:00', 'Caida', 'Limpieza y vendaje', 'Caida en escaleras. Raspon en palma de la mano. Limpieza y tirita.'),

-- Marco (19)
(19, 1, '2025-01-27 12:30:00', 'Sangrado nasal', 'Presion y hielo', 'Epistaxis tras estornudo fuerte. Cedio en 5 minutos.'),
(19, 1, '2025-02-21 09:00:00', 'Fiebre 37.5', 'Observacion', 'Febricula. Se observo 1 hora. No subio. Continuo en clase.'),

-- Vega (20)
(20, 1, '2025-02-13 10:15:00', 'Dolor de muelas', 'Aviso a padres', 'Dolor intenso en molar inferior. Se recomendo visita al dentista.'),
(20, 1, '2025-03-04 14:30:00', 'Picadura de avispa', 'Limpieza y hielo', 'Picadura en el brazo en el recreo. Sin reaccion alergica. Hielo y observacion.');