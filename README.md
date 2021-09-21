# HACK NEWS!!

-- Hack News se trata de una página web de noticias, donde visualizar las últimas publicaciones, hacer filtraciones por temas ver cuales son las noticias más valoradas por los usuarios.

-- Los usuarios que se registran, también pueden realizar otras acciones como votar las diferentes noticias, dejar comentarios, compartirlas o incluso reportar alguna incidencia que encuentren en las mismas. También pueden publicar sus propias noticias y así colaborar con el crecimiento de la página web.

-- La web está formada por dos partes diferenciadas: el Backend y el Frontend.

# Backend

-- En está parte de la API rest se encuentra la parte funcional, así como el servidor y la base de datos de dónde dispondremos de los datos necesario a mostrar en la web y los que luego se crearán por los diferentes usuarios.

-- Para iniciar el Backend, abriremos un terminal y nos colocaremos en la carpeta raíz (backend) y ejecutaremos el comando "npm run dev".

-- Esto hará que se ponga en funcionamiento el servidor de la base de datos.

-- La API cuenta con un archivo ".env.exemple" en el cuál se encuentran los ejemplos de las variables globales creadas en la que hay que cubrir los campos libres para la correcta ejecución de la misma, según los datos aportados al Mysql. 
    - Las variables "SENDGRID_API_KEY" y "SENDGRID_FROM", se deben a los datos correspondientes a la cuenta creada en http://sengrid.com del propio usuario, para el envío automático de emails de validación de usuario.
    - "SECRET" debe ser un string alfanumérico aleatorio.
    

-- En la carpeta "bbdd" se encuentran los scripts necesarios para iniciar la base de datos(db) a la cuál recurre el servidor, y el que ejecuta y crea las diferentes tablas y datos de esta base.

-- A continuación, encontra la carpeta de "controllers" dónde se encuntran los diferentes controladores de los endpoints. Esta está dividida en dos secciones, la de las noticias(entries) y la de los(users).

-- En "middlewares", se encuentran algunas funciones para el ejecución de las llamadas.

-- "schemes" es la carpeta donde se encuentran los esquemas de validación de los diferentes controladores.

-- En "static" encontraremos los archivos de tipo imagen.

-- El archivo de "helpers", contiene funciones comunes para todo el backend.

-- Ya por último, encontramos el archivo perteneciente al servidor, el cuál ejecutamos para iniciarlo, y en el que se encuentran todos los endpoints de las diferentes llamadas con sus respectivos controllers y middlewares de errores.

## EndPoints de noticias

-   **GET** - [/entries] - Retorna el listado de todas las noticias.
-   **GET** - [/entries/:idEntry] - Retorna una noticia en concreto.
-   **POST** - [/entries] - Crea una noticia nueva.
-   **POST** - [/entries/:idEntry/photos] - Añade una imagen a la noticia.
-   **POST** - [/entries/:idEntry/votes] - Valora positiva o negativamente una noticia.
-   **POST** - [/entries/:idEntry/report] - Reporta una noticia que puede resultar ofensiva o innadecuada.
-   **POST** - [/entries/:idEntry/coment] - Dejar comentarios reelacionados con la noticia.
-   **PUT** - [/entries/:idEntry] - Editar la información de una noticia.
-   **DELETE** - [/entries/:idEntry/photos/:idPhoto] - Elimina una foto de una noticia.
-   **DELETE** - [/entries/:idEntry] - Elimina la noticia.

## EndPoints de usuarios

-   **GET** - [/users/:idUser] - Retorna información de un usuario en concreto.
-   **POST** - [/users] - Crea un nuevo usuario pendiente de activar.
-   **GET** - [/users/validate/:registrationCode] - Valida un usuario recién registrado.
-   **POST** - [/users/login] - Logea un usuario retornando un token.
-   **PUT** - [/users/:idUser] - Edita los datos pertenecientes a un usuario.
-   **PUT** - [/users/:idUser/password] - Edita la contraseña de un usuario.
-   **PUT** - [/users/password/recover] - Envia un correo con el código de reseteo de contraseña al email de registro del usuario.
-   **PUT** - [/users/password/reset] - Cambia la contraseña de un usuario.
-   **DELETE** - [/users/:idUser] - Elimina un usuario.



# Database

-- En esta sección encontraremos todo lo relacional a la base de datos como el script de creación y un diagrama de flujo para la relación entre las diferentes tablas.

## Tablas
Cada tabla tiene las siguientes entradas: 

- _Users_
    id 
    userName
    email 
    password 
    biografia 
    avatar 
    active 
    deleted 
    role 
    registrationCode 
    createdAt 
    modifiedAt 
    recoverCode 

- _Entries_
    id
    place 
    title 
    them 
    lead 
    description 
    views 
    photo 
    createdAt 
    modifiedAt 
    idUser (relacional a la tabla users)

- _Photos_ 
    id 
    photo 
    avatar 
    createdAt 
    idEntry (relacional a la tabla entradas)

- _EntriesComents_ 
    id 
    coment 
    createdAt 
    idEntry (relacional a la tabla entradas)
    idUser (relacional a la tabla users)

- _EntriesRatings_ 
    id 
    vote 
    createdAt 
    idEntry (relacional a la tabla entradas)
    idUser (relacional a la tabla users)

- _EntriesReports_ 
    id 
    report 
    createdAt 
    idEntry (relacional a la tabla entradas)
    idUser (relacional a la tabla users)


# Frontend

-- El frontend está realizado con React App, en el cuál nos colocalemos en la raíz del proyecto para ejecutar los comandos para cada función:
    - npm start / yarn start según programa de ejecución, para inicializarlo.
    - npm build / yarn build para construis los diferentes contenedores una vez creada la API.
    - npm  / yarn 

-- Se diferencian dos carpetas en esta sección que son "public", en la se encuentra el archivo HTML al que ser referenciará la App y "src" en donde se encuentran el resto de carpetas y archivos referentes al desarroyo y funcionamiento de la App.

-- "Assets" es la carpeta destinada a las imágenes o iconos de la web.

-- "Components" es una de las carpetas más importantes, pues en ella se encuentran los diferentes elementos base que componen la App.

-- "Pages" carpeta en la que se encuentran las diferentes páginas que debe cargar la App.

-- "Routes" con las diferentes path a rutas relativas a las páginas que debe cargar.

-- "Utils" con funciones de ayuda o Hooks para el correcto desarroyo del funcionamiento de la App.

-- Y los archivos de "App" e "Index" en los que se hace referencia al elemento root y se inician los valores principales de dicha App.
