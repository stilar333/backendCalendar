const express = require("express");
const { dbConection } = require("./database/config");
const cors = require("cors")
require("dotenv").config();


/* crear el server de express */

const app = express();

/* base de datos */

dbConection();

/* cors */
app.use(cors())

/* directorio publico */
/* app.use() es un middleware es una funcion que se ejecuta cuando un usuario hace una peticion al server */
/* el express.static recibe el path o direccion */


app.use(express.static("public"))


/* lectura y parseo del body */

app.use(express.json())



/* Rutas van acompañados con el tipo de peticion que nosotros queremos */

/* aqui en este use se establece la ruta donde en este caso todo lo relacionado con esa ruta va a ser del auth  */
/* y el require es todo lo que se exporte de ese archivo se va a poder acceder desde la ruta establecida */

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/events", require("./Routes/events"));

/* TODO: CRUD: eventos */





/* escuchar peticiones la funcion listen del objeto app recibe como primer parametro un puerto y un callback=funcion

*/

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUN ON PORT ${process.env.PORT}`);
});