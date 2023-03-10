# ¡Bienvenid@ a PimPam Buga! 🚀️

### **Descripción:**

PimPam Buga es una aplicación web que funciona como una plataforma
de carpooling o ridesharing. La idea es conectar a personas que necesitan
viajar con otras que tienen un destino similar para que puedan compartir un vehículo
y dividir los gastos de gasolina y peajes.

Los usuarios pueden registrarse con una cuenta de correo electrónico y una contraseña.
Una vez dentro, el usuario puede buscar un viaje especificando el origen y destino,
la fecha  y el número de pasajeros que necesita.
La aplicación mostrará los viajes disponibles que coinciden
con los criterios de búsqueda del usuario. El usuario puede elegir el viaje que
más le conviene y ponerse en contacto con el conductor a través de la
plataforma para acordar los detalles del viaje.

Los conductores también pueden publicar sus viajes en
la aplicación, especificando los detalles del trayecto y el número de asientos
disponibles. Los pasajeros interesados en el viaje pueden contactar al
conductor a través de la aplicación y acordar los detalles del viaje.

### **Beneficios:**

PimPam Buga tiene muchos beneficios para los usuarios:

* Reducción de los costos de transporte: los
  usuarios pueden dividir los costos de gasolina y peajes entre ellos, lo que hace que el viaje sea más económico
* Menor impacto ambiental: al compartir un vehículo se reduce la cantidad de emisiones de CO2, lo que ayuda a preservar el medio ambiente
* Mayor comodidad: los usuarios pueden viajar en un vehículo cómodo y seguro, lo que hace que el viaje sea más agradable que viajar en transporte público
* Mayor comodidad: los usuarios pueden viajar en un vehículo cómodo y seguro, lo que hace que el viaje sea más agradable que viajar en transporte público

---

### Librerías del proyecto:

* ReactJS
* React-router-dom
* React-Hook-form
* ExpressJS
* Mongoose (Base de datos)
* Socket IO
* Cloudinary
* JWT
* Material UI
* Express-validator
* Express-Morgan

---

### Interfaz del usuario

1. **Pagina inicial**

La pagina inicial contiene una barra de Navegación,
visible durante todo el uso de la aplicacion. Controla el estado de 
login de los usuarios y les permite, entre otras cosas:

* Registrarse
* Iniciar Sesión

En la home tenemos el buscador y una serie de textos sobre la aplicación. 
Podemos:

* buscar un viaje existente por origen, destino, fecha y asientos disponibles.
* visualizar la disponibilidad de algunas rutas pre-determinadas.

*Screenshot:*

![frontpage](https://user-images.githubusercontent.com/34273028/224056042-7c8f36d1-01cc-45cd-831e-affd99d0c925.png)

2. **Form de registro de un nuevo usuario**

Form creado utilizando un modal, que permite registrar un nuevo usuario recogiendo algunos datos básicos utilizando
React Hook Form para contorlar errores y/o campos requeridos.

*Screenshot:*

![register](https://user-images.githubusercontent.com/34273028/224056056-a4ea63a7-cb63-4dc1-9211-c6cd487da80a.png)

3. **Form de login del usuario**

Form creado utilizando un modal, con validaciones a lado del client y servidor utilizando
React Hook Form para contorlar errores y/o campos requeridos.

*Screenshot:*

![login](https://user-images.githubusercontent.com/34273028/224056050-d1fed7e8-5345-4b26-97f9-4e163cc85596.png)

4. **Búsqueda de viajes, lista de resultados y detalle del viaje**

Al buscar un viaje desde la pagina principal de la aplicación,
se devuelve una lista de los viajes disponibles, incluyendo:

* origen
* destino
* hora de inicio
* hora de llegada
* nombre y foto del conductor
* precio
* plazas disponibles

Al hacer click sobre un viaje, es posible ver el detalle del mismo, visualizar los puntos de origen y destino en google maps,

Si el usuario tiene una sesión activa, será posible chatear con el conductor, o inscribirse como participante al viaje, siempre que este tenga plazas disponibles.

*Screenshots:*

![búsqueda](https://user-images.githubusercontent.com/34273028/224056035-1a9954ee-7a94-4ca3-b81a-02ca3bc13cbf.png)

![detalles búsqueda](https://user-images.githubusercontent.com/34273028/224056040-120b004b-5a72-4821-96cb-0057fb4d89a6.png)

![map](https://user-images.githubusercontent.com/34273028/224056053-65fee834-5d49-418a-9287-4e14b654705c.png)

5. **Perfil del usuario**

En la pagina del perfil del usuario se encuentran enlaces de utilidad, como por ejemplo la gestión de los datos personales.

* Visualizar los datos del usuario, subir o cambiar la imagen del perfil, determinar cuales son los hábitos como conductor y seleccionar marca o modelo del propio coche.

* Tus viajes: es posible visualizar en la misma sección los viajes creados como conductor y las reservas de viajes como pasajero. También podemos cancelar las reservas si fuera necesario.

*Screenshots:*

![perfil1](https://user-images.githubusercontent.com/34273028/224072511-4c3a4f46-14e0-47a5-8075-cb98e7454a4d.png)

![perfil](https://user-images.githubusercontent.com/34273028/224072567-397974e9-f52f-4032-8660-8343d8cf4d2e.png)

![viajesyreservas](https://user-images.githubusercontent.com/34273028/224072690-24df99cd-055a-4ce5-97d2-b44094c92837.png)

6. **Crear nuevo viaje**

Mediante esta función, es posible crear un nuevo viaje como conductor, ofreciendo a los otros usuarios la posibilidad de inscribirse como huéspedes, y pagando una cantidad de dinero para aprovechar el servicio.

*Screenshot:*

![newtravel](https://user-images.githubusercontent.com/34273028/224070271-3dea9e10-6d02-46a6-9ea8-ad68fd8105eb.png)

7. **Notificaciones**

Cuando un usuario reserva plaza o cancela su reserva en un viaje activo, el conductor recibe una notificación.
En el menu del usuario aparecerá un icono de estado, que permite saber si hay notificaciones sin leer. En el mismo menu, un numero al lado del enlace identifica cuantas notificaciones estás sin leer. Una vez dentro de la opción de mensajes, puedes marcar estos como leídos y eliminarlos.

*Screenshots:*

![notificaciones](https://user-images.githubusercontent.com/34273028/224070696-a2f72492-2aa2-4b0b-a901-2d837d794bb6.png)

![notifdetail](https://user-images.githubusercontent.com/34273028/224071810-1b6b6144-4f91-417c-b02d-affb0e544315.jpg)


8. **Chat**

El chat permite interacció directa entre los usuarios. Cuando vemos un viaje de otro usuario, podemos abrir chat con éste para hablar
sobre el viaje, condiciones, etc antes de reservar. El componente principal del chat es un floating div unido a la navbar lo que hace que,
al igual que ésta, aparezca y esté presnete siempre que un usuario esté logueado, permitiendo acceder a los chats desde cualquier opción.


*Screenshots:*

---

### Nuestro componente Favorito

El componente que queremos destacar es la creación de un nuevo viaje, **newTrip.js**.

Es un modal que se abre sobre cualquier pantalla pulsando el icono + (crear viaje) desde la navbar.

El componente es un formulario creado en *react hook forms*, que utiliza el componente especial *Controller* para importar varios campos específicos basados en componente de *Material UI* customizados.

Estos son:

* Un datepicker para poder elegir fecha y hora de salida, y hora de llegada
* Un componente autocomplete custom que, cuando detecta que has escrito más de tres caracteres, realiza una petición a backend con el texto introducido. Backend recoge esta petición y realiza a su vez una llamada a la API de **Radar **(una alternativa gratuita a google maps).

Radar devuelve un array de localizaciones que se acercan al string introducido por el usuario. Backend elimina opciones indeseadas y duplicados, formatea el output a un formato español (Radar lo da en inglés) y devuelve a frontend un array de opciones, que frontend recoge y dinámicamente coloca como opciones de autocomplete.

Al rellenar los campo y hacer submit del form, el front pasa a backend el texto seleccionado, y backend de nuevo llama a Radar, convirtiendo el texto en coordenadas GPS que guardamos en BBDD. Esto nos permitirá hacer búsquedas por cercanía y por coordenadas. Tanto el texto de la localización de origen/destino como sus coordenadas quedan guardadas en BBDD y se pueden utilizar en las búsquedas

---

### Autores del proyecto

Fernando Rosal

Paulo Dutra Duffy

Albert Bosch

Miriam Castelló

Alex Acevedo

Antonio Colella

### Final credits

  🎉️🎉️🎉️ Gracias a todos los profesores que nos han permitido llevar a cabo esta aventura!




