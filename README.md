# ProjectBreakFinal-Back

# Ecommerce Backend
    Este proyecto es la parte backend de una tienda online, construido para servir datos de productos a un frontend basado en React. Ofrece una API RESTful sencilla y optimizada para operaciones de lectura y autenticación básica.

# Funcionalidades Principales

a. API REST para Productos

    · Obtención de todos los productos.
    · Filtrado de productos por categoría.
    · Obtención de detalles de un producto específico.

b. Gestión de Usuarios (Opcional / Extendible)

    · Registro y autenticación básica simulada.
    · Emisión y validación de tokens para control de sesiones.

C. Conexión con Base de Datos (Opcional / Mockeado)

    · Actualmente los productos se pueden cargar desde un mock o bien conectarse a una base de datos real (MongoDB recomendado).

d. Manejo de Errores

    · Respuestas claras y estructuradas ante errores o peticiones inválidas.

e. CORS y Seguridad Básica

    · Habilitado CORS para permitir comunicación segura entre backend y frontend.
    · Buenas prácticas en el manejo de datos sensibles.

# Tecnologías Utilizadas

    · Node.js (servidor)
    · Express.js (framework de servidor rápido)
    · MongoDB (opcional para persistencia real)
    · Mongoose (si se conecta a MongoDB)
    · dotenv (manejo de variables de entorno)
    · CORS (para habilitar acceso desde otros dominios)
    · JWT (Json Web Tokens) (para autenticación básica, si se implementa)

# Estructura de Carpetas Principal
```
ProjectBreakFinal/
 ├── config/
 │    └── db.js
 │
 ├── controllers/
 │    ├── authController.js
 │    ├── ProductControllers.js
 │    └── usersController.js
 │
 ├── libs/
 │    └── initialSetup.js
 │
 ├── middleware/
 │    ├── authjwt.js
 │    └── verifySignUp.js
 │
 ├── models/
 │    ├── Product.js
 │    ├── Role.js
 │    └── User.js
 │
 ├── routes/
 │    ├── authRoutes.js
 │    ├── ProductRoutes.js
 │    └── usersRoutes.js │
 │
 └── app.js
```
# Instalación y Uso

1. Clonar el repositorio:

git clone https://github.com/tuusuario/ecommerce-backend.git

2. Instalar las dependencias:

npm install

3. Configurar las variables de entorno:

Crear un archivo .env en la raíz del proyecto con:

MONGODB_URI=tu_conexion_mongodb (opcional)
JWT_SECRET=tu_secreto_super_seguro

4. Ejecutar en modo desarrollo:

npm run dev

o en modo producción:

npm start

5. Acceder a la API en:

http://localhost:3000/api/products

# Notas

El backend está preparado para ser fácilmente escalable: puedes añadir controladores para usuarios, pedidos, pasarelas de pago, etc.
Si no tienes una base de datos configurada, puedes simular los productos en memoria o cargar un archivo JSON.