# Programa 

La propuesta plantea desarrollar un programa de acceso restringido, donde solo el administrador tendrá la autoridad para crear usuarios con distintos roles. Adicionalmente, se podrán configurar perfiles personalizados que se ajusten a las capacidades y necesidades específicas del cliente, garantizando una gestión eficiente y adaptada al sistema.



# Implementación

### Eliminar verifyToken
- Retira la función verifyToken del archivo auth.route.ts para permitir la creación de un nuevo usuario.


### Registrar un nuevo usuario
- Realiza el registro del usuario accediendo a la ruta: POST
http://localhost:3000/api/auth/register.

> El registro debe incluir los siguientes campos: correo electrónico, contraseña (con un mínimo de 6 caracteres) y rol (opciones disponibles: admin, visit, catcher, editor).

```
{
  "email": "cris.gallardos@gmail.com",
  "password": "cg9053",
  "role": "admin"
}

```

### Reintegrar verifyToken
- Vuelve a implementar la función verifyToken en el archivo auth.route.ts.

### Iniciar pruebas
- Ingresa a la ruta POST http://localhost:3000/api/auth con el usuario recién creado para comenzar las pruebas.

> El Login debe incluir los siguientes campos: correo electrónico y contraseña. 

```
{
  "email": "cris.gallardos@gmail.com",
  "password": "cg9053"
}

```

### Crear perfil estudiantes

- Ingresa a la ruta POST http://localhost:3000/api/students

> El Registro de estudiantes debe incluir los siguientes campos obligatorios: Nombre, Apellido, correo electrónico y teléfono.

```
{
  "name": "Carlos",
  "lastname": "Pérez",
  "email": "carlos.perez@gmail.com",
  "rut": null,
  "birthdate": null,
  "sex": null,
  "address": null,
  "nationality": null,
  "source": null,
  "contact": null,
  "phone": "123456789",
  "contactdate": null,
  "call1": {
    "comment": null,
    "completed": false
  },
  "call2": {
    "comment": null,
    "completed": false
  },
  "call3": {
    "comment": null,
    "completed": false
  },
  "positivefeedback": null,
  "linkdni": null,
  "school": null,
  "course": null,
  "communicationpreference": null
}

```

### Links para pruebas 

- http://localhost:3000/api/users
- http://localhost:3000/api/students


# Socket io

Se llama al servidor desde el index.ts

- Se crean módulos separados para manejar la lógica de Socket.IO (socket.hadlers.ts). Esto facilita la lectura y el mantenimiento del código.
- Se mantiene la función handleError en un módulo separado o en un archivo de utilidades.
- Se configuración de Socket.IO (creación del servidor, configuración de CORS, etc.) 