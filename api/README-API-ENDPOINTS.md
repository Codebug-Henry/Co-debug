# API ENDPOINTS

## ÍNDICE

1. [Rutas **user**](#rutas-user)
    - [GET user](#get-user)
    - [POST user](#post-user)
    - [PUT user](#put-user)
    - [DELETE user](#delete-user)
2. [Rutas **users**](#rutas-users)
    - [GET users](#get-users)
    - [GET users top ten](#get-users-top-ten)
3. [Rutas **question**](#rutas-question)
    - [GET question](#get-question)
    - [POST question](#post-question)
    - [PUT question](#put-question)
    - [DELETE question](#delete-question)
4. [Rutas **questions**](#rutas-questions)
    - [GET user questions](#get-user-questions)
    - [GET all questions](#get-all-questions)
    - [GET questions favourites](#get-questions-favourites)
    - [PUT questions favourites](#put-questions-favourites)
5. [Rutas **answer**](#rutas-answer)
    - [POST answer](#post-answer)
    - [PUT answer](#put-answer)
    - [DELETE answer](#delete-answer)
6. [Rutas **answers**](#rutas-answers)
    - [GET answers](#get-answers)
7. [Rutas **message**](#rutas-message)
    - [POST message](#post-message)
8. [Rutas **messages**](#rutas-messages)
    - [GET all messages](#get-all-messages)
9. [Rutas **alert**](#rutas-alert)
    - [POST alert question](#post-alert-question)
    - [POST alert answer](#post-alert-answer)
10. [Rutas **alerts**](#rutas-alerts)
    - [GET all alerts](#get-all-alerts)
11. [Observaciones](#observaciones)

***

## RUTAS **user**

***

### GET **user**

- **RUTA**: router.get("/user/:sub", getUserInfo)

- **DESCRIPCION**: esta ruta es para devolver toda la info de un usuario

- **REQUERIMIENTOS**: por params enviar sub de el usuario  

        /${sub}=>/(text de el auth0)

- **RESPUESTA**: un objeto que contiene toda la info del usuario

        {
            sub,
            name,
            nickname,
            email,
            locale,
            myTeachPoints,
            picture,
            statusAdmin,
            statusBanned,
            statusDeleted,
            favourites,
            cantFav,
            cantQuest,
            cantAns,
            myPosition      //posición del usuario en el ranking
        }

***

### POST **user**

- **RUTA**: router.post("/user", postUser)

- **DESCRIPCION**: esta ruta es para crear un usuario cuando se registra

- **REQUERIMIENTOS**: por body enviar datos del usuario.

        {
            sub,
            name,
            nickname,
            email,
            locale,
            picture
        }

- **RESPUESTA**: si encuentra el usuario no lo crea, sino lo crea. devuelve el usuario

        {
            sub,
            name,
            nickname,
            email,
            locale,
            myTeachPoints,
            picture,
            statusAdmin,
            statusBanned,
            statusDeleted,
            favourites,
            cantFav,
            cantQuest,
            cantAns
        }

***

### PUT **user**

- **RUTA**: router.put("/user/:sub", putUserInfo)

- **DESCRIPCION**: esta ruta es para actualizar la info de un usuario

- **REQUERIMIENTOS**: por params enviar sub de el usuario, por body enviar props a cambiar  

        /${sub}=>/(text de el auth0)

        body = obj con props cambiadas

        {
            name,
            nickname,
            picture,
            myTeachpoints,
            statusAdmin,
            statusBanned,
            statusDeleted
        }

- **RESPUESTA**: un objeto con el user modificado

        {
            sub,
            name,
            nickname,
            email,
            locale,
            myTeachPoints,
            picture,
            statusAdmin,
            statusBanned,
            statusDeleted,
            favourites,
            cantFav,
            cantQuest,
            cantAns
        }

***

### DELETE **user**

- **RUTA**: router.delete("/user/:sub", deleteUser)

- **DESCRIPCION**: esta ruta es para borrar un usuario de la base de datos

- **REQUERIMIENTOS**: por params enviar sub de el usuario  

        /${sub}=>/(text de el auth0)

- **RESPUESTA**: un string indicando que "el usuario ha sido eliminado correctamente"

***

## RUTAS **users**

***

### GET **users**

- **RUTA**: router.get("/users", getUsers)

- **DESCRIPCION**: esta ruta es para obtener todos los usuarios para rankearlos

- **REQUERIMIENTOS**: por query deberan enviar page, limit, sort para definir como ordenarlos (puntos/preguntas/respuestas/nombres y asc/desc), admin si solo se quieren obtener los usuarios que son o no son admin, all si se quieren todos los usuarios incluidos los baneados/eliminados, y search si se quiere buscar por email

        /?sort=points-asc/points-desc/quest-asc/quest-desc/answ-asc/answ-desc/name-asc/name-desc
        &page=(número de página)
        &limit=(cantidad de elementos por página)
        &admin=true/false
        &all=true (o nada)
        &search=(email que se desea buscar)

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (todos los usuarios, en un principio acomodados de mayor a menor puntaje). Se incluye la posición en el ranking como una propiedad dentro de cada objeto del arreglo results.

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    myTeachPoints,
                    name,
                    nickname,
                    picture,
                    cantAns,
                    statusDeleted,
                    sub,
                    myPosition
                },
                .
                .
                .
                {
                    myTeachPoints,
                    name,
                    nickname,
                    picture,
                    cantAns,
                    statusDeleted,
                    sub,
                    myPosition
                }
            ]
        }

***

### GET **users top ten**

- **RUTA**: router.get("/users/topTen", getTopTen)

- **DESCRIPCION**: esta ruta es para obtener los usuarios con los 10 mayores puntajes

- **REQUERIMIENTOS**: ninguno

- **RESPUESTA**: un arreglo de tamaño 10, con dichos usuarios ordenado por puntos de mayor a menor (se incluye la posición en el ranking como una propiedad dentro de cada objeto del areglo)

        [
            {
                myTeachPoints,
                name,
                nickname,
                picture,
                statusDeleted,
                sub,
                myPosition
            },
            .
            .
            .
            {
                myTeachPoints,
                name,
                nickname,
                picture,
                statusDeleted,
                sub,
                myPosition
            }
        ]

***

## RUTAS **question**

***

### GET **question**

- **RUTA**: router.get("/question/:id", getSingleQuestion)

- **DESCRIPCION**: esta ruta es para acceder al detalle de una pregunta con todas sus respuestas.

- **REQUERIMIENTOS**: por params enviar id de pregunta y por query enviar page y limit para el paginado de las respuestas.

/:id    (id de la pregunta)
?page=(número de página)
&limit=(cantidad de elementos por página)

- **RESPUESTA**: devuelvo un objeto con la info de la pregunta.

        {
            user:{
                (todas las propiedades del usuario)
            },
            //tag,
            title,
            teachPoints,
            text,
            likes,
            statusDeleted,
            statusValidated,
            cantAnswers,
            respuestas: [
                {
                    text,
                    likes,
                },
                .
                .
                .
                {
                    text,
                    likes,
                }
            ]
        }

***

### POST **question**

- **RUTA**: router.post("/question", postQuestion)

- **DESCRIPCION**: esta ruta es para crear una pregunta.

- **REQUERIMIENTOS**: por body enviar datos de la pregunta. 

        {
            sub,
            //tag,
            text,   //contenido de la pregunta
            title   //titulo de la pregunta
        }

- **RESPUESTA**: un objeto con la pregunta creada y la info del usuario

        {
            user: {
                (todas las propiedades del usuario)
            },
            //tag,
            title,
            teachPoints,
            text,
            likes,
            statusDeleted,
        }

***

### PUT **question**

- **RUTA**: router.put("/question", putUserQuestion)

- **DESCRIPCION**: esta ruta es para poder modificar una pregunta.

- **REQUERIMIENTOS**: por body enviar el id de la pregunta + campo a actualizar (en el caso de like, si se sumó o restó un like las opciones son "add" o "remove"). 

        {
            sub,
            id,
            //tag,
            text,   //contenido de la pregunta
            title,  //titulo de la pregunta
            like,   //"add" or "remove" 
            statusDeleted,
        }

- **RESPUESTA**: devuelvo un objeto con la info actualizada.

        {
            //tag,
            text,   //contenido de la pregunta
            title,   //titulo de la pregunta
            likes,    //cantidad de likes de la pregunta
            statusDeleted,
        }

***

### DELETE **question**

- **RUTA**: router.delete("/question/:id",deleteUserQuestion)

- **DESCRIPCION**: esta ruta es para eliminar una pregunta (con todas sus respuestas).

- **REQUERIMIENTOS**: por params enviar id de pregunta. 

- **RESPUESTA**: un string con el siguiente mensaje: “pregunta eliminada”

***

## RUTAS **questions**

***

### GET **user questions**

- **RUTA**: router.get("/questions/:sub",getUserQuestions)
 
- **DESCRIPCION**: esta ruta es para acceder a todas mis preguntas.

- **REQUERIMIENTOS**: recibo “sub” por params y puede traer por query ?page, ?limit, ?search para que busque dentro de sus preguntas y ?answered para filtrar por preguntas respondidas o no respondidas, en caso de no traer ?answered simplemente accedo a todas las preguntas del usuario.

        ?page=(número de página)
        &limit=(cantidad de elementos por página)
        &search=" " (string que esta buscando en texto/titulo)
        &answered=" " (answered=>true/false)

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (preguntas del usuario)

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    id,
                    //tag,
                    title,
                    teachPoints,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                    cantAnswers,
                },
                .
                .
                .
                {
                    id,
                    //tag,
                    title,
                    teachPoints,
                    text,
                    likes,
                    statusDeleted,
                    cantAnswers,
                }
            ]
        }

***

### GET **all questions**

- **RUTA**: router.get("/questions",getAllQuestions)

- **DESCRIPCION**: esta ruta es para acceder a todas las preguntas.

- **REQUERIMIENTOS**: puede traer por query ?search para buscar, ?sort para ordenar, ?page, ?limit y ?validated (en caso de no traer ?search simplemente accedo a todas las preguntas).

        ?search=" " (string que esta buscando en texto/titulo)
        &sort=" "   (sort=>string que define ordenamiento por antiguedad (asc/desc))
        &page=(número de página)
        &limit=(cantidad de elementos por página)
        &validated=(booleano que define filtrado por si la pregunta ya tiene una respuesta validada o no (true/false))

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (preguntas en base a la busqueda o todas las preguntas)

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    user: {
                        (todas las propiedades del usuario)
                    },
                    id,
                    //tag,
                    title,
                    teachPoints,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                    cantAnswers,
                },
                .
                .
                .
                {
                    user: {
                        (todas las propiedades del usuario)
                    },
                    id,
                    //tag,
                    title,
                    teachPoints,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                    cantAnswers,
                }
            ]
        }

***

### GET **questions favourites**

- **RUTA**: router.get("/questions/favourites/:sub", getFavourites)

- **DESCRIPCION**: esta ruta es para acceder a mis preguntas favoritas.

- **REQUERIMIENTOS**: por params enviar sub del usuario y por query enviar page y limit. 

        /${sub}
        &page=(número de página)
        &limit=(cantidad de elementos por página)

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (preguntas favoritas del usuario y la info del usuario)

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    user:{
                        (todas las propiedades del usuario)
                    },
                    id,
                    //tag,
                    title,
                    teachPoints,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                    cantAnswers,
                },
                .
                .
                .
                {
                    id,
                    //tag,
                    title,
                    teachPoints,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                    cantAnswers,
                }
            ]
        }
  
***

### PUT **questions favourites**

- **RUTA**: router.put("/questions/favourites", putFavourites)

- **DESCRIPCION**: esta ruta es para agregar o quitar preguntas de la lista de favotitos.

- **REQUERIMIENTOS**: recibe por query ?sub=" "&id=" "&add=boolean

        (sub=>sub del usuario)
        (id=>id de la pregunta)
        (add=>true agrega/false borra)

- **RESPUESTA**: agregada o quitada correctamente a favoritos

***

## RUTAS **answer**

***

### POST **answer**

- **RUTA**: router.post("/answer", postAnswer)

- **DESCRIPCION**: esta ruta es para que el usuario pueda responder una pregunta y se agregue al hilo de respuestas

- **REQUERIMIENTOS**: por body enviar sub del usuario, id de la pregunta y el texto de la respuesta 

        {
            sub,
            id,
            text
        }

- **RESPUESTA**: un objeto con la info de la respuesta creada

        {
            sub,
            id,
            text,
            teachPoints     //se le asignan los teachPoints que posee en ese momento la pregunta
        }

***

### PUT **answer**

- **RUTA**: router.put("/answer", putAnswer)

- **DESCRIPCION**: esta ruta es para que el usuario pueda editar una de sus respuestas

- **REQUERIMIENTOS**: por body enviar el id de la respuesta, el texto editado, si se sumó o restó un like ("add"/"remove"), si se eliminó o si se validó

        {  
            id,
            text,
            like,   //"add" or "remove" 
            statusDeleted,
            statusValidated,
        }

- **RESPUESTA**: en caso de ser necesaria -> el texto de la respuesta editada y el contador de likes actualizado

        {
            text,
            likes,    //cantidad de likes de la respuesta 
            statusDeleted,
            statusValidated,
        }

***

### DELETE **answer**

- **RUTA**: router.delete("/answer/:id", deleteAnswer)

- **DESCRIPCION**: esta ruta es para que el usuario pueda eliminar una de sus respuestas

- **REQUERIMIENTOS**: por params enviar el id de la respuesta

        /answer/${id}

- **RESPUESTA**: en caso de ser necesaria -> "respuesta eliminada correctamente"

***

## RUTAS **answers**

***

### GET **answers**

- **RUTA**: router.get("/answers/:sub", getAnswers)

- **DESCRIPCION**: esta ruta es para que el usuario pueda ver sus respuestas publicadas con sus preguntas asociadas

- **REQUERIMIENTOS**: por params enviar el sub del usuario y por query ?page y ?limit

        /answers/${sub}
        &page=(número de página)
        &limit=(cantidad de elementos por página)

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (todas las respuestas del usuario)

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    question: {
                        (todas las propiedades de la pregunta)
                    },
                    id,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                },
                .
                .
                .
                {
                    question: {
                        (todas las propiedades de la pregunta)
                    },
                    id,
                    text,
                    likes,
                    statusDeleted,
                    statusValidated,
                }
            ]
        }

***

## RUTAS **message**

***

### POST **message**

- **RUTA**: router.post("/message", postMessage)

- **DESCRIPCION**: esta ruta es para crear un mensaje por parte del usuario para que le llegue a los admin.

- **REQUERIMIENTOS**: por body enviar datos del mensaje. 

        {
            sub,
            title   //titulo del mensaje
            text,   //contenido del mensaje
        }

- **RESPUESTA**: un objeto con el mensaje creado y la info del usuario

        {
            user: {
                (todas las propiedades del usuario)
            },
            title,
            text,
        }

***

## RUTAS **messages**

***

### GET **all messages**

- **RUTA**: router.get("/messages",getAllMessages)

- **DESCRIPCION**: esta ruta es para que los admin puedan acceder a todos los mensajes que enviaron los usuarios a través del formulario de contacto.

- **REQUERIMIENTOS**: debe traer por query ?page y ?limit

        ?page=(número de página)
        &limit=(cantidad de elementos por página)

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (todos los mensajes)

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    user: {
                        (todas las propiedades del usuario)
                    },
                    id,
                    title,
                    text,
                },
                .
                .
                .
                {
                    user: {
                        (todas las propiedades del usuario)
                    },
                    id,
                    title,
                    text,
                }
            ]
        }

***

## RUTAS **alert**

***

### POST **alert question**

- **RUTA**: router.post("/alert/question", postAlertQuestion)

- **DESCRIPCION**: esta ruta es para crear una alerta por parte del usuario sobre una pregunta para que le llegue a los admin.

- **REQUERIMIENTOS**: por body enviar datos de la alerta. 

        {
            id,
            message   //motivo de la alerta
            subCreator,   //sub del usuario que generó la alerta
        }

- **RESPUESTA**: un objeto con la alerta creada y la info de la pregunta

        {
            id,
            message,
            subCreator,
            question: {
                (todas las propiedades de la pregunta)
            }
        }

***

### POST **alert answer**

- **RUTA**: router.post("/alert/answer", postAlertAnswer)

- **DESCRIPCION**: esta ruta es para crear una alerta por parte del usuario sobre una respuesta para que le llegue a los admin.

- **REQUERIMIENTOS**: por body enviar datos de la alerta. 

        {
            id,
            message   //motivo de la alerta
            subCreator,   //sub del usuario que generó la alerta
        }

- **RESPUESTA**: un objeto con la alerta creada y la info de la respuesta

        {
            id,
            message,
            subCreator,
            answer: {
                (todas las propiedades de la respuesta)
            }
        }

***

## RUTAS **alerts**

***

### GET **all alerts**

- **RUTA**: router.get("/alerts",getAllAlerts)

- **DESCRIPCION**: esta ruta es para que los admin puedan acceder a todas las alertas que enviaron los usuarios

- **REQUERIMIENTOS**: debe traer por query ?page y ?limit

        ?page=(número de página)
        &limit=(cantidad de elementos por página)

- **RESPUESTA**: un objeto con 3 propiedades: totalPages, pages, results (todos los mensajes)

        {
            totalPages: (cantidad de paginas totales),
            pages: []     //rango de paginas habilitadas (máximo 5),
            results: [
                {
                    id,
                    title,
                    text,
                    (question/answer): {
                        (todas las propiedades de la pregunta o respuesta según corresponda)
                    },
                },
                .
                .
                .
                {
                    id,
                    title,
                    text,
                    (question/answer): {
                        (todas las propiedades de la pregunta o respuesta según corresponda)
                    },
                }
            ]
        }

***

## Observaciones

La info del aut0 es utilizada por el back, nosotros les devolveremos la info del back y esa sera renderizada (ya que no se puede modifcar la info del usuario en el auth0, pero si el usuario en la base de datos).
