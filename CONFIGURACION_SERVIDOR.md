# Configuración del Servidor UNLujo

## Variables de Entorno Requeridas

Crea un archivo `.env` en el directorio `server/` con las siguientes variables:

```env
# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=UNLujo
DB_USER=postgres
DB_PASSWORD=Thvafi03

# Configuración JWT
JWT_SECRET=unlujo_secret_key_2024_super_secure
JWT_EXPIRES_IN=24h

# Configuración del servidor
PORT=5000
NODE_ENV=development
```

## Instalación de Dependencias

1. Navega al directorio del servidor:
```bash
cd server
```

2. Instala las dependencias:
```bash
npm install
```

## Configuración de la Base de Datos

1. Asegúrate de que PostgreSQL esté ejecutándose
2. Crea la base de datos `UNLujo` si no existe
3. Ejecuta el script de creación de tablas desde el directorio `database/`:
```bash
cd ../database
python create_tables_ordered.py
```

## Ejecución del Servidor

1. Desde el directorio `server/`:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## Endpoints Disponibles

- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login de usuarios
- `GET /api/auth/profile` - Perfil del usuario autenticado
- `GET /api/carreras` - Lista de carreras disponibles
- `GET /api/db-status` - Estado de la conexión a la base de datos

## Seguridad

- Las contraseñas se hashean con bcrypt
- Se utiliza JWT para autenticación
- Validación de datos con Joi
- Rate limiting implementado
- Headers de seguridad con Helmet
