# Final Project Henry - Co-debug

El sitio está pensado para otorgar un espacio de preguntas y respuestas entre estudiantes de programación. El mismo está planificado a fin de ser dinámico e intuitivo para que la experiencia sea lo más espontánea posible. A diferencia de otras soluciones preexistentes.
Entre las funciones a desarrollar podemos destacar la valorización de respuestas a preguntas con mayor tiempo sin solucionar. Puntuamos a quienes ayudan y los destacamos en un ranking según su participación. También hacemos públicas las interacciones para que los usuarios puedan aprender de las dudas de otros.
Este sitio busca terminar con el problema presente en todo grupo de estudios donde al generarse mucha interacción, algunas preguntas quedan olvidadas en el historial general. Además busca también fomentar la empatía y conectar alumnos entre sí formando grupos de estudios.
No está demás informar que el proyecto está pensado para ser utilizado por personas que actualmente se encuentran estudiando esta carrera.

## User Stories

### High Value - Low Complexity

- US 2: Como usuario/administrador necesito poder ingresar en mi cuenta en el caso de ya estar creada para tener acceso a mi información personal.
  US 2.1: Como usuario puedo acceder a mi cuenta mediante un login tradicional con los campos “usuario” y “contraseña”.
  US 2.2: Como usuario puedo acceder a mi cuenta mediante un login con Google, Facebook o Github.
- US 3: Como usuario no registrado quiero tener una vista previa de las preguntas y respuestas que otorga la página para entender la funcionalidad de la misma.
  US 3.1: Como usuario no registrado quiero tener posibilidad de hacer búsquedas en las preguntas, así como filtrar y ordenar los resultados.
- US 7: Como usuario del sitio web quiero poder visualizar un contador de preguntas respondidas, un contador de puntos obtenidos y mi posición en el “ranking” para conocer mi aporte dentro del sitio.
- US 11: Como usuario necesito un filtro para elegir el tipo de preguntas según un tema específico y de esta manera poder ir al contenido de mi preferencia.
- US 12: Como usuario necesito la posibilidad de ordenamiento por antigüedad y otro por validaciones para poder llegar al contenido deseado con mayor rapidez.
- US 42: Como usuario quiero poder acceder a la página de inicio desde el logo para poder navegar por la página con fluidez.
- US 43: Como usuario/admin quiero poder acceder a mi perfil desde el icono con mi imagen para poder navegar por la página con fluidez.
- US 44: Como usuario quiero poder acceder a mis preguntas para poder navegar por la página con fluidez.
- US 45: Como usuario quiero poder acceder a mis respuestas para poder navegar por la página con fluidez.
- US 46: Como usuario quiero poder acceder a mis respuestas favoritas para poder navegar por la página con fluidez.
- US 47: Como usuario quiero poder acceder al ranking para poder navegar por la página con fluidez.
- US 48: Como usuario/admin quiero poder editar mi perfil para mantenerlo actualizado.

### High Value - High Complexity

- US 1: Como usuario/administrador sin cuenta necesito crear una a través de la cual autenticar mis credenciales para evitar posibles fraudes.
  US 1.1: Como usuario puedo registrarme usando un e-mail tradicional, y luego confirmarlo.
  US 1.2: Como usuario puedo registrarme ya sea usando Facebook, Google o Github.
- US 8: Como usuario necesito un botón para crear mis propias preguntas para exponerlas y que alguien pueda contestarlas.
- US 10: Como usuario quiero poder ver las preguntas actuales para poder elegir cuales responder y/o acceder a sus respuestas.
- US 19: Como usuario quiero poder postear una pregunta para poder solucionar mi duda.
  US 19.1: Como usuario quiero completar un formulario con mi pregunta y los datos necesarios para que sea válida.
  US 19.2: Como usuario quiero poder enviar mi pregunta y recibir (o no) notificación sobre novedades.
- US 20: Como usuario quiero poder contestar preguntas de otros usuarios para ayudar a la comunidad.
  US 20.1: Como usuario quiero observar la pregunta completa que elegí para poder responder.
  US 20.2: Como usuario quiero observar la información de los puntos que otorga una respuesta correcta para saber cuantos puntos sumaría a mi cuenta personal.
  US 20.3: Como usuario quiero escribir la respuesta a la pregunta en un campo de texto de tamaño acorde para después enviarla y que quede publicada en el hilo de respuestas.
  US 20.4: Como usuario quiero tener la posibilidad de enviar la respuesta por whatsapp (si es que la función se encuentra habilitada) para que la misma le llegue de forma directa al celular del usuario que realizó la pregunta.
- US 27: Como usuario quiero visualizar una lista de respuestas previamente escritas para decidir si quiero editarlas o no.
  US 27.1: Como usuario quiero poder editar las respuestas escritas para poder arreglar errores.
  US 27.2: Como usuario quiero que al editar las respuestas se le envíe una notificación al autor de dicha pregunta para que esté al tanto de que hubo una edición.
- US 28: Como usuario quiero poder ver todas las preguntas que he realizado para, al tener conocimiento de su existencia, no realizar las mismas preguntas.
- US 29: Como usuario quiero poder eliminar/editar mis preguntas, en el caso de haber cometido un error en las mismas.
- US 30: Como usuario quiero ver las respuestas de mis preguntas, para poder puntuarlas/reportarlas.
- US 34: Como administrador necesito conocer las alertas del sistema sobre acciones de usuarios fuera de parámetros para revisarlas y resolver en consecuencia.
  US 34.1: Como administrador necesito revisar las alertas del sistema sobre preguntas o respuestas informando al usuario de la edición de las estas.
  US 34.2: Como administrador necesito supervisar las acciones de los usuarios para identificar acciones susceptibles de llamado de atención.
  US 34.3: Como administrador necesito revisar las alertas del sistema sobre preguntas o respuestas informando al usuario de la eliminación.
  US 34.4: Como administrador necesito supervisar las acciones de los usuarios para identificar acciones susceptibles de baneo.

### Low Value - Low Complexity

- US 4: Como usuario puedo acceder al ranking para entender el sistema de premiación al ayudar a otras personas con sus consultas.
- US 5: Como usuario puedo leer un resumen básico que explica el funcionamiento del sitio para entender sus herramientas y el motivo de su existencia.
- US 6: Como usuario del website quiero una barra de navegación con funcionalidades de log-in y log-out, y las principales herramientas del sitio para que me permita siempre tener acceso rápido a las mismas.
- US 9: Como usuario necesito poder calificar otras preguntas para, de esa manera, filtrar las que no tengan un propósito claro o adecuado, o por el contrario, dar valor a las de mayor importancia.
- US 14: Como usuario quiero acceder al listado de preguntas frecuentes para poder resolver algunas dudas básicas que pueda tener.
- US 15: Como usuario quiero completar y enviar un formulario de recomendaciones o quejas de la página para que los desarrolladores puedan hacer mejora continua sobre la misma.
- US 16: Como usuario quiero contactar de forma directa a los desarrolladores de la página para comunicarles algún mensaje en particular (agradecimientos, sugerencias, propuestas, etc).
- US 17: Como usuario quiero poder acceder a la información de cada uno de los creadores para conocer más en detalle (nombre, linkedin, experiencia, github, imagen) a los responsables de desarrollar la página.
- US 18: Como usuario quiero poder leer un resumen básico que explica cómo cargar una pregunta.
- US 21: Como usuario quiero calificar la pregunta de manera anónima para valorar de forma positiva/negativa las preguntas que me gustan/disgustan para eliminar preguntas que no corresponden a la página.
  US 21.1: Como usuario quiero tener acceso a un “Botón favoritas” para agregar la pregunta específica a una lista de favoritas para tenerla reservada en caso de querer reutilizarla.
  US 21.2: Como usuario quiero tener acceso a un “Botón reportar” para reportar la pregunta específica en caso de verla inadecuada.
  US 21.3: Como usuario quiero tener acceso a un “Botón like” para puntuar positivamente la pregunta en caso de verla correcta.
  US 21.4: Como usuario quiero tener acceso a un “Botón dislike” para puntuar negativamente la pregunta en caso de verla incorrecta.
- US 23: Como usuario quiero poder modificar mi nombre de usuario, pudiendo hacerlo hasta un máximo de 2 veces.
- US 25: Como usuario puedo ver toda la lista de usuarios, ordenados de mayor a menor basado en su puntaje y también puedo ver los trofeos y medallas de los que están ubicados en los primeros puestos.
  US 25.1: Como usuario quiero poder buscar a otro usuario.
- US 26: Como usuario puedo visualizar una lista con todas las respuestas favoritas que guardé manualmente, ya sea de preguntas propias o de otros usuarios.
- US 31: Como usuario puedo leer y aceptar/rechazar los términos y condiciones de uso antes de elegir registrarme o no.
- US 37: Como administrador quiero observar el listado completo de los usuarios con toda su información, tanto datos personales, como su respectiva calificación.
  US 37.1: Como administrador quiero tener acceso a administrar los usuarios para categorizarlos según su participación o como no deseado (blacklist). Con el fin de ofrecer incentivos a los usuarios activos y tener control sobre los usuarios no deseados.
- US 38: Como administrador quiero poder dar de alta o eliminar administradores para que colaboren como moderadores de la aplicación.
- US 40: Como administrador quiero poder acceder a comentarios y sugerencias que envían los usuarios, para poder efectuar las mejoras necesarias y poder contestarle a aquellos usuarios que se comuniquen.
- US 49: Como usuario quiero que el footer tenga un área de referencia de los creadores, para poder acceder a sus perfiles para ver sus datos y contactar con ellos.
- US 50: Como usuario, quiero poder acceder a un área de preguntas frecuentes/ayuda/contacto en caso de no entender alguna funcionalidad de la página.
- US 41: Como usuario, quiero ver los derechos de la página para saber como comportarme con el contenido de la página.

### Low Value - High Complexity

- US13: Como usuario necesito saber mediante un cartel la existencia de preguntas nuevas a las cuales puedo acceder haciendo click en el.
- US 22: Como usuario quiero poder agregar y/o modificar una imagen de perfil, optando por seleccionar una foto de mi galería (almacenamiento propio) o bien elegir un avatar predefinido.
- US 32: Como usuario quiero poder eliminar mi usuario, a través de una confirmación vía e-mail para poder cesar mi participación en la aplicación.
  US 32.1: Como usuario quiero poder eliminar todas mis preguntas hechas hasta el momento para tener total control de mi contenido dentro de la aplicación.
  US 32.2: Como usuario, quiero poder completar un formulario para enviar recomendaciones o quejas que tengan que ver con la eliminación del usuario y los motivos o causas del mismo.
  US 32.3: Como usuario, puedo visualizar un mensaje que espera verme pronto nuevamente.
- US 33: Como usuario quiero poder ver un tutorial para conocer las funcionalidades básicas de la aplicación.
- US 35: Como usuario necesito ver las preguntas que llevan más tiempo sin ser respondidas para ganar más puntos al responderlas.
  US 35.1: Como usuario quiero acceder a un listado de las preguntas sin respuestas y los valores que otorgan por ser respondidas para elegir las más convenientes.
