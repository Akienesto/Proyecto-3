# Proyecto-3
### Base de datos de películas y actores
### Tipos de acceso y rutas
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



### TO DO
- Añadir nombre de personaje correspondiente a cada actor en cada película.
- Añadir trailer de películas.
