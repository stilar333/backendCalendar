const express = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req, res = express.response) => {

    const { email, password} = req.body

    try {
        /* esto busca si hay un usuario en con ese mismo email en la base de datos */
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "un usuario existe con ese correo"
            });
        }

        /* despues usuario se sobre escribe para crear un usuario con los nuevos datos  */
        usuario = new Usuario(req.body);

        /* encriptar contraseña */
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();


        /* generar jwt */
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json(
            {
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg: "porfavor hable con el Provedor"
            }
        )
    }
}


const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "El usuario o contraseña no son correctos"
            });
        }
        /* confirmar password */
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json(
                {
                    ok:false,
                    msg: "password incorrecto"
                }
            )
        }

        /* generar jwt */
        const token = await generarJWT(usuario.id, usuario.name);


        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        



    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg: "porfavor hable con el Provedor"
            }
        )
        
    }

}



const revalidarToken =  async(req, res) => {

    const {uid, name} = req
    
    const token = await generarJWT(uid, name)


    res.json(
        {
            ok: true,
            name,
            uid,
            token
        }
    );
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}