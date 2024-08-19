Ecommerce Server (NestJS + Express)
Este repositorio contiene el código fuente para un servidor de comercio electrónico basado en NestJS y Express. El servidor proporciona API endpoints para gestionar productos, pedidos, usuarios y otras funcionalidades relacionadas con un ecommerce.

Características
Gestión de productos: Crear, leer, actualizar y eliminar productos.
Gestión de pedidos: Crear, leer y actualizar pedidos.
Autenticación de usuarios: Registro, inicio de sesión y autenticación mediante tokens JWT.
Integración con base de datos: Utiliza TypeORM para interactuar con una base de datos (por ejemplo, PostgreSQL o MySQL).
Requisitos previos
Node.js (versión 14 o superior)
npm o yarn
Base de datos (por ejemplo, PostgreSQL) configurada y accesible


Instalación

Clona este repositorio:

git clone https://github.com/tu-usuario/ecommerce-server.git

cd ecommerce-server

Instala las dependencias:
npm install

Configura las variables de entorno:
Crea un archivo .env en la raíz del proyecto y define las variables necesarias (por ejemplo, la cadena de conexión a la base de datos, el secreto para JWT, etc.).
