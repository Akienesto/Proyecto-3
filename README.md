# Proyecto-3
### Base de datos de películas y actores
La idea del proyecto es crear una base de datos de películas y actores y poder realizar busquedas de todo tipo dentro de ella. La propuesta es que todos estos datos sean aportados por los usuarios registrados. Una vez registrados, los usuarios tendran la opción de añadir películas, actores y comentarios. También podrán crear listas de sus películas favoritas y puntuarlas y/o darles likes.
***
### Tecnologías utilizadas
![image](https://user-images.githubusercontent.com/98311389/158407417-29eef77d-c4a9-4c55-afc5-a55c19a63c47.png)
![image](https://user-images.githubusercontent.com/98311389/158408051-f95c0a1b-29a2-4c6e-bba4-1be97e5001fa.png)

**Node JS:** Ha sido el lenguaje de Backend que hemos utilizado, lo hemos usado para realizar las rutas al servidor así como describir los modelos, exportarlos y conectarlos vía node modules.

**Dependencias:**

Se han utilizado varias dependencias, que nos han permitido diversas funcionalidades:

**Mongoose:** Es una librería para Node. js que nos permite escribir consultas para una base de datos de MongoDB, con características como validaciones, construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos.

**Nodemoon:** Es una utilidad de interfaz de línea de comandos (CLI) desarrollada por @rem que envuelve su aplicación Node, vigila el sistema de archivos y reinicia automáticamente el proceso ( no necesitas reiniciar el servidor cada vez que realizas un cambio)

**Express:** Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona mecanismos para:

- Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
            
- Integración con motores de renderización de "vistas" para generar respuestas mediante la introducción de datos en plantillas.

- Establecer ajustes de aplicaciones web como qué puerto usar para conectar, y la localización de las plantillas que se utilizan para renderizar la respuesta.

- Añadir procesamiento de peticiones "middleware" adicional en cualquier punto dentro de la tubería de manejo de la petición.
Dotenv: La librería Dotenv nos permitirá cargar a través del método config() y el objeto path, el archivo .env que necesitemos de acuerdo al entorno deseado. Agregamos 2 nuevas tareas en nuestro archivo package.

**Bcrypt:** Es una función de hashing de passwords diseñado por Niels Provos y David Maxieres, basado en el cifrado de Blowfish. Lleva incorporado un valor llamado salt, que es un fragmento aleatorio que se usará para generar el hash asociado a la password, y se guardará junto con ella en la base de datos. Así se evita que dos passwords iguales generen el mismo hash y los problemas que ello conlleva, por ejemplo, ataque por fuerza bruta a todas las passwords del sistema a la vez. Con el salt, se añade un grado de complejidad que evita que el hash asociado a una password sea único.

**JWT (JsonWebToken):** Es un token de seguridad que nosotros creamos al momento que el usuario se registra con sus credenciales. Este token se devuelve al cliente el cual tendrá que enviar cada vez que solicita información al servidor. Nos permite identificarnos cuando realizamos el Login.

**Mongo DB:** Es el tipo de base de datos que hemos utilizado para el proyecto, se trata de una base NOSQL donde hemos almacenado todos nuestros datos de la web.
PostMan: Se trata de una aplicación que nos permite realizar pruebas API. Es un cliente HTTP que nos da la posibilidad de testear ‘HTTP requests’ a través de una interfaz gráfica de usuario, por medio de la cual obtendremos diferentes tipos de respuesta que posteriormente deberán ser validados.

**Métodos:**

Postman nos ofrece muchos métodos para interactuar con los ‘endpoints’. Los más utilizados y sus funciones son:

- GET: Obtener información
- POST: Agregar información
- PUT: Reemplazar la información
- PATCH: Actualizar alguna información
- DELETE: Borrar información
VisualStudio: Es el editor de código empleado.

Git es nuestro repositorio y Github es nuestra cuenta.
***
### ***Tipos de acceso y rutas***
### ACCESO COMO ADMINISTRADOR

### PUT
- http://localhost:5000/api/modifyMovie/:id 
Permite modificar a traves del body todos los datos introducidos previamente en cada película.Titulo,año,argumento,reparto,género e imagen.Se requiere la id de la película a través de los parámetros.
- http://localhost:5000/api/modifyComment/:id
Permite modificar a traves del body todos los datos introducidos previamente en cada comentario.Se requiere la id del comentario a través de los parámetros.
- http://localhost:5000/api/modifyActor/:id
Permite modificar a traves del body todos los datos introducidos previamente en cada actor.Nombre,año de nacimiento,biografía,fotografía y películas en las que ha participado.Se requiere la id del actor a través de los parámetros.

### DELETE
- http://localhost:5000/api/deleteMovie/:id
Permite borrar de la base de datos la película seleccionada introduciendo la id a través de los parámetros.
- http://localhost:5000/api/deleteComment/:id
Permite borrar de la base de datos el comentario seleccionado introduciendo la id a través de los parámetros.
- http://localhost:5000/api/deleteActor/:id
Permite borrar de la base de datos el actor seleccionado introduciendo la id a través de los parámetros.

### GET
- http://localhost:5000/api/getComment/:id
Permite encontrar un comentario en particular introduciendo la id a través de los parámetros.

### ACCESO COMO USUARIO

### POST
- http://localhost:5000/api/newMovie
Permite crear una película introduciendo por el body el título,año,argumento,género e imagen.También se crean campos vacios para rellenar con,reparto,puntuación,comentarios y likes.
- http://localhost:5000/api/newActor
Permite crear un actor introduciendo por el body,nombre,año de nacimiento,biografía,fotografía y películas en las que ha participado.
- http://localhost:5000/api/newComment
Permite crear un comentario correspondiente a una película introduciendo por el body el texto del comentario y el id de la película.
- http://localhost:5000/api/list
Permite añadir una película a la lista de películas de cada usuario.
- http://localhost:5000/api/likes
Permite dar un like o dislike a una película.
- http://localhost:5000/api/newScore/:movieId
Permite puntuar una película.

### PUT
- http://localhost:5000/api/modifyComment/:id
Permite modificar un comentario hecho previamente por un usuario.

### DELETE
- http://localhost:5000/api/deleteUser/:id
Permite eliminar tu cuenta de usuario.

### RUTAS ABIERTAS

### GET
- http://localhost:5000/api/getMovie/:id
Permite encontrar una película introduciendo su id en los parametros.
- http://localhost:5000/api/getActor/:id
Permite encontrar un actor introduciendo su id en los parametros.
- http://localhost:5000/api/allMovies
Permite encontrar todas las películas.
- http://localhost:5000/api/allActors
Permite encontrar todos los actores.

### POST
- http://localhost:5000/api/newUser
Permite crear un nuevo usuario introduciendo nombre,email y password por el body.
- http://localhost:5000/api/login
Permite logearse y conseguir un token de usuario introduciendo nombre y password por el body.
***

### MODELOS
Los modelos dentro de NodeJS van a representar a una entidad de la base de datos y más concretamente van a representar a un único registro o documento de nuestra base de de datos.
Estos han sido los modelos utilizados en este proyecto.

![modelos proyecto 3](https://user-images.githubusercontent.com/98311389/158419650-42feb62b-d1c6-4034-98e5-25ac6b330c3d.png)


### TO DO
- Añadir modelo de personaje.
- Añadir modelo de género de películas.
- Añadir trailer de películas.
