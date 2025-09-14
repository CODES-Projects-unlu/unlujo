# Base de Datos UNLujo

## Descripción General

La base de datos UNLujo está diseñada para el sistema de centros de estudiantes de la Universidad Nacional de Luján. Utiliza PostgreSQL como motor de base de datos y SQLAlchemy como ORM para Python.

## Configuración

- **Motor de Base de Datos**: PostgreSQL
- **ORM**: SQLAlchemy
- **URL de Conexión**: `postgresql://postgres:Thvafi03@localhost:5432/UNLujo`
- **Puerto**: 5432
- **Base de Datos**: UNLujo

## Estructura de Tablas

### 1. Tabla `careers` (Carreras)

Almacena información sobre las carreras universitarias disponibles.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `nombre` | VARCHAR(255) | Nombre completo de la carrera |
| `sigla` | VARCHAR(10) | Abreviación (LSI, LTS, LE) |
| `codigo` | VARCHAR(20) | Código oficial del plan |
| `descripcion` | TEXT | Descripción de la carrera |
| `duracion_años` | INTEGER | Duración en años |
| `estado` | VARCHAR(20) | Estado: 'active'/'inactive' |
| `fecha_creacion` | TIMESTAMP | Fecha de creación del registro |

### 2. Tabla `subjects` (Materias)

Contiene información sobre las materias de cada carrera.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `codigo` | VARCHAR(10) UNIQUE | Código único de la materia |
| `nombre` | VARCHAR(255) | Nombre de la materia |
| `año` | INTEGER | Año de la carrera |
| `cuatrimestre` | VARCHAR(50) | "Primer Cuatrimestre" o "Segundo Cuatrimestre" |
| `horas_semanales` | INTEGER | Horas semanales |
| `horas_totales` | INTEGER | Horas totales |
| `correlatividad` | TEXT | JSON con códigos de materias correlativas |
| `modalidad` | VARCHAR(20) | "Presencial", "Virtual", "Mixta" |
| `carrera_id` | INTEGER FK | Referencia a careers.id |
| `estado` | VARCHAR(20) | "Activa" o "Inactiva" |
| `fecha_creacion` | TIMESTAMP | Fecha de creación |
| `fecha_baja` | TIMESTAMP | Fecha de baja (NULL si está activa) |

### 3. Tabla `users` (Usuarios)

Gestiona la información de los usuarios del sistema.

#### Información Personal
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `nombre` | VARCHAR(100) | Nombre del usuario |
| `apellido` | VARCHAR(100) | Apellido del usuario |
| `email` | VARCHAR(255) UNIQUE | Email único |
| `telefono` | VARCHAR(20) | Teléfono (opcional) |
| `foto` | VARCHAR(500) | URL de la foto de perfil |
| `fecha_nacimiento` | DATETIME | Fecha de nacimiento |
| `dni` | VARCHAR(20) UNIQUE | DNI único |

#### Información Académica
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `carrera_id` | INTEGER FK | Referencia a careers.id |
| `año_ingreso` | INTEGER | Año de ingreso |
| `estado_academico` | VARCHAR(20) | "Activo", "Inactivo", "Egresado", "Abandonó" |

#### Información de Cuenta
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `rol` | VARCHAR(20) | "super_admin", "admin_carrera", "estudiante" |
| `estado` | VARCHAR(20) | "Activo", "Inactivo", "Suspendido" |

#### Autenticación y Seguridad
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `username` | VARCHAR(50) UNIQUE | Username (opcional) |
| `password_hash` | VARCHAR(255) | Hash de la contraseña |
| `salt` | VARCHAR(255) | Salt para el hash |
| `intentos_fallidos` | INTEGER | Contador de intentos fallidos |
| `bloqueado_hasta` | DATETIME | Fecha hasta la cual está bloqueado |
| `token_reset_password` | VARCHAR(255) | Token para reset de contraseña |
| `fecha_expiracion_token` | DATETIME | Fecha de expiración del token |

#### Verificación de Email
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `email_verificado` | BOOLEAN | Estado de verificación |
| `codigo_verificacion` | VARCHAR(10) | Código de verificación |
| `fecha_verificacion_email` | DATETIME | Fecha de verificación |

#### Timestamps
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `fecha_creacion` | DATETIME | Fecha de creación de la cuenta |
| `fecha_ultimo_acceso` | DATETIME | Último acceso |
| `fecha_baja` | DATETIME | Fecha de baja lógica |

### 4. Tabla `chatbot_conversations` (Conversaciones del Chatbot)

Registra las conversaciones del chatbot para análisis y mejora.

#### Información de la Conversación
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `usuario_id` | INTEGER FK | Referencia a users.id (opcional) |
| `session_id` | VARCHAR(100) | ID de sesión para agrupar mensajes |
| `mensaje_usuario` | TEXT | Mensaje del usuario |
| `respuesta_chatbot` | TEXT | Respuesta del chatbot |
| `intencion_detectada` | VARCHAR(50) | Intención detectada |
| `confianza_respuesta` | INTEGER | Nivel de confianza (0-100) |
| `fuente_respuesta` | VARCHAR(50) | Fuente de la respuesta |

#### Información de Contexto
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `carrera_usuario` | VARCHAR(100) | Carrera del usuario |
| `tema` | VARCHAR(50) | Tema de la conversación |
| `sentimiento` | VARCHAR(20) | Sentimiento detectado |
| `palabras_clave` | TEXT | Palabras clave extraídas |

#### Metadatos
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `fecha_creacion` | DATETIME | Fecha de la conversación |
| `tiempo_respuesta` | INTEGER | Tiempo de respuesta en ms |
| `calificacion_usuario` | INTEGER | Calificación del usuario (1-5) |
| `fue_util` | BOOLEAN | Si fue útil (NULL = no evaluado) |
| `necesita_revision` | BOOLEAN | Si necesita revisión manual |

## Servicios y Utilidades

### UserService (`user_service.py`)

Servicio principal para la gestión de usuarios con las siguientes funcionalidades:

- **Crear usuario**: Registro de nuevos usuarios con validaciones
- **Verificar email**: Verificación de email con código
- **Autenticar usuario**: Login con email y contraseña
- **Reset de contraseña**: Solicitud y reseteo de contraseña

### AuthUtils (`auth_utils.py`)

Utilidades de autenticación y seguridad:

- **Generación de salt**: Para hashing seguro de contraseñas
- **Hash de contraseñas**: Usando PBKDF2 con SHA-256
- **Verificación de contraseñas**: Comparación segura
- **Códigos de verificación**: Generación de códigos de 6 dígitos
- **Tokens de reset**: Generación de tokens seguros
- **Gestión de bloqueos**: Control de intentos fallidos

## Scripts de Gestión

### `create_tables_ordered.py`
Script para crear todas las tablas en el orden correcto respetando las dependencias.

### `debug_tables.py`
Script para verificar el estado de las tablas y conexión.

### `test_auth.py`
Script de pruebas para el sistema de autenticación.

## Seguridad

- **Hashing de contraseñas**: PBKDF2 con SHA-256 y salt aleatorio
- **Protección contra ataques**: Bloqueo de cuentas después de 5 intentos fallidos
- **Tokens seguros**: Generación de tokens URL-safe para reset de contraseña
- **Verificación de email**: Sistema de verificación por código
- **Baja lógica**: Los usuarios no se eliminan, se marcan como inactivos

## Dependencias

- **SQLAlchemy**: ORM para Python
- **PostgreSQL**: Motor de base de datos
- **hashlib**: Para hashing de contraseñas
- **secrets**: Para generación de tokens seguros
- **datetime**: Para manejo de fechas y timestamps

## Notas de Implementación

1. **Orden de creación**: Las tablas deben crearse en el orden correcto debido a las dependencias de claves foráneas
2. **Validaciones**: Se implementan validaciones a nivel de aplicación y base de datos
3. **Auditoría**: Todas las tablas incluyen timestamps de creación y modificación
4. **Escalabilidad**: La estructura permite futuras extensiones sin cambios mayores
5. **Integridad**: Se mantiene la integridad referencial entre tablas relacionadas
