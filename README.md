# CRUD Usuarios

Pequeña API CRUD en Node.js con Express y MariaDB/MySQL usando `mysql2`.

Instalación:

```bash
npm install
cp .env.example .env
# editar .env con credenciales de DB
npm run dev
```

Endpoints:

- `POST /usuarios` - Crear usuario
- `GET /usuarios` - Obtener todos
- `GET /usuarios/:id` - Obtener por id
- `PUT /usuarios/:id` - Actualizar por id
- `DELETE /usuarios/:id` - Eliminar por id

Tabla esperada `usuarios`:

```sql
CREATE TABLE usuarios (
  usu_id INT PRIMARY KEY AUTO_INCREMENT,
  usu_usuario VARCHAR(50),
  usu_nombre VARCHAR(50),
  usu_apellido VARCHAR(50)
);
```
