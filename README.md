# NurseSchool

[🇪🇸 Español](#español) | [🇬🇧 English](#english)

---

## Español

**Trabajo Fin de Grado — Desarrollo de Aplicaciones Multiplataforma (DAM)**
Autor: Marcin Ladkiewicz | Centro: Prometeo

### Descripción

NurseSchool es una aplicación móvil multiplataforma destinada a la gestión sanitaria en centros educativos. Permite a la enfermería del colegio registrar y consultar las atenciones médicas realizadas a los alumnos, gestionar alergias y patologías, y notificar a los padres en tiempo real. La dirección del centro dispone de acceso a un panel de estadísticas para el seguimiento global de la salud escolar.

### Roles de usuario

| Rol | Descripción |
|---|---|
| **Enfermero/a** | Gestiona alumnos, registra atenciones, alergias y patologías, sube informes en PDF |
| **Padre / Madre** | Consulta el historial médico y las atenciones de sus hijos |
| **Dirección** | Accede al panel de estadísticas y al historial completo del centro |

### Funcionalidades principales

- Autenticación con JWT y control de acceso por rol
- Gestión completa de alumnos (alta, edición, baja)
- Registro de atenciones médicas con descripción de actuación
- Gestión de alergias (alimentarias y medicamentosas) con nivel de severidad
- Gestión de patologías con posibilidad de adjuntar informes PDF
- Notificaciones push a los padres mediante **expo-notifications**
- Panel de estadísticas para la dirección
- Exportación del historial completo

### Tecnologías

#### Frontend
- **React Native** con **Expo** (iOS, Android y Web)
- React Navigation (stack + bottom tabs)
- Axios para llamadas a la API REST
- Expo Notifications (push notifications)
- Expo Document Picker y File System (gestión de PDFs)

#### Backend
- **Node.js** con **Express 5**
- **PostgreSQL** como base de datos relacional
- **JWT** para autenticación
- **Bcrypt** para el cifrado de contraseñas
- **Multer** para la subida de ficheros
- **PDFKit** para la generación de informes PDF
- **Expo Server SDK** para el envío de notificaciones push mediante expo-notifications

#### Infraestructura
- **Docker Compose** para levantar la base de datos PostgreSQL y Adminer

### Estructura del proyecto

```
NurseSchool/
├── backend/
│   ├── config/          # Conexión a BD y esquema SQL
│   ├── controllers/     # Lógica de negocio por entidad
│   ├── middlewares/     # Autenticación, roles y subida de ficheros
│   ├── routes/          # Rutas de la API REST
│   ├── uploads/         # PDFs subidos por la enfermería
│   └── server.js        # Punto de entrada del servidor
├── frontend/
│   └── src/
│       ├── api/         # Llamadas a la API
│       ├── components/  # Componentes reutilizables
│       ├── context/     # Contexto de autenticación
│       ├── navigation/  # Configuración de navegación
│       ├── screens/     # Pantallas por rol (nurse, parents, direction, auth)
│       ├── theme/       # Estilos globales
│       └── utils/       # Utilidades
└── docker-compose.yml
```

### Instalación y puesta en marcha

#### Requisitos previos
- Node.js >= 18
- Docker y Docker Compose
- Expo CLI (`npm install -g expo-cli`)

#### 1. Base de datos

```bash
docker compose up -d
docker exec -i nurseschool-db-1 psql -U user -d nurseschool < backend/config/schema.sql
docker exec -i nurseschool-db-1 psql -U user -d nurseschool < backend/config/seed.sql
```

Adminer disponible en `http://localhost:8080`.

#### 2. Backend

```bash
cd backend
cp .env.example .env   # Configurar variables de entorno
npm install
npm run dev
```

El servidor arranca en `http://localhost:3000`.

#### 3. Frontend

```bash
cd frontend
npm install
npx expo start
```

Escanea el código QR con la app Expo Go o ejecuta en emulador/simulador.

### Variables de entorno (backend)

| Variable | Descripción |
|---|---|
| `DB_HOST` | Host de la base de datos |
| `DB_PORT` | Puerto de PostgreSQL |
| `DB_USER` | Usuario de la BD |
| `DB_PASSWORD` | Contraseña de la BD |
| `DB_NAME` | Nombre de la BD |
| `JWT_SECRET` | Clave secreta para firmar los tokens JWT |
| `EXPO_ACCESS_TOKEN` | Token de acceso para el servicio de notificaciones de Expo (opcional) |

### API REST — Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/students` | Listar alumnos |
| POST | `/api/students` | Crear alumno |
| GET | `/api/attentions/:id` | Detalle de atención |
| POST | `/api/attentions` | Registrar atención |
| GET | `/api/allergies/:studentId` | Alergias de un alumno |
| POST | `/api/pathologies` | Añadir patología |
| GET | `/api/dashboard` | Estadísticas (dirección) |

### Licencia

Proyecto académico — Todos los derechos reservados © 2025 Marcin Ladkiewicz

---

## English

**Final Degree Project — Multiplatform Application Development (DAM)**
Author: Marcin Ladkiewicz | School: Prometeo

### Description

NurseSchool is a cross-platform mobile application designed for healthcare management in educational centres. It allows the school nurse to record and consult medical care given to students, manage allergies and pathologies, and notify parents in real time. School management has access to a statistics dashboard for overall monitoring of student health.

### User Roles

| Role | Description |
|---|---|
| **Nurse** | Manages students, records medical care, allergies and pathologies, uploads PDF reports |
| **Parent** | Views the medical history and care records of their children |
| **Management** | Accesses the statistics dashboard and the full centre history |

### Main Features

- JWT authentication with role-based access control
- Full student management (create, edit, delete)
- Medical attention records with actuation description
- Allergy management (food and drug) with severity levels
- Pathology management with optional PDF report attachments
- Push notifications to parents via **expo-notifications**
- Statistics dashboard for management
- Full history export

### Technologies

#### Frontend
- **React Native** with **Expo** (iOS, Android and Web)
- React Navigation (stack + bottom tabs)
- Axios for REST API calls
- Expo Notifications (push notifications)
- Expo Document Picker and File System (PDF management)

#### Backend
- **Node.js** with **Express 5**
- **PostgreSQL** as the relational database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **PDFKit** for PDF report generation
- **Expo Server SDK** for sending push notifications via expo-notifications

#### Infrastructure
- **Docker Compose** to run the PostgreSQL database and Adminer

### Project Structure

```
NurseSchool/
├── backend/
│   ├── config/          # Database connection and SQL schema
│   ├── controllers/     # Business logic per entity
│   ├── middlewares/     # Auth, roles and file upload
│   ├── routes/          # REST API routes
│   ├── uploads/         # PDFs uploaded by the nurse
│   └── server.js        # Server entry point
├── frontend/
│   └── src/
│       ├── api/         # API calls
│       ├── components/  # Reusable components
│       ├── context/     # Auth context
│       ├── navigation/  # Navigation setup
│       ├── screens/     # Screens by role (nurse, parents, direction, auth)
│       ├── theme/       # Global styles
│       └── utils/       # Utilities
└── docker-compose.yml
```

### Installation & Setup

#### Prerequisites
- Node.js >= 18
- Docker and Docker Compose
- Expo CLI (`npm install -g expo-cli`)

#### 1. Database

```bash
docker compose up -d
docker exec -i nurseschool-db-1 psql -U user -d nurseschool < backend/config/schema.sql
docker exec -i nurseschool-db-1 psql -U user -d nurseschool < backend/config/seed.sql
```

Adminer available at `http://localhost:8080`.

#### 2. Backend

```bash
cd backend
cp .env.example .env   # Set environment variables
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

#### 3. Frontend

```bash
cd frontend
npm install
npx expo start
```

Scan the QR code with the Expo Go app or run on an emulator/simulator.

### Environment Variables (backend)

| Variable | Description |
|---|---|
| `DB_HOST` | Database host |
| `DB_PORT` | PostgreSQL port |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `EXPO_ACCESS_TOKEN` | Expo access token for push notifications (optional) |

### REST API — Main Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Login |
| GET | `/api/students` | List students |
| POST | `/api/students` | Create student |
| GET | `/api/attentions/:id` | Attention detail |
| POST | `/api/attentions` | Register attention |
| GET | `/api/allergies/:studentId` | Student allergies |
| POST | `/api/pathologies` | Add pathology |
| GET | `/api/dashboard` | Statistics (management) |

### License

Academic project — All rights reserved © 2025 Marcin Ladkiewicz
