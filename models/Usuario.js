const { Schema, model } = require("mongoose");

/* esquema es como la informacion que se va a grabar en la base de datos */
const UsuarioSchema= Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }
    }
);

module.exports = model("Usuario", UsuarioSchema);