
/*
    Rutras de usuarion /auth
    host+ /api/auth 
*/


const { Router } = require("express");
const { crearUsuario, loginUsuario, revalidarToken } = require("../controlles/auth");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()


router.post("/new",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio y debe de ser de 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ]
    , crearUsuario)

router.post("/",
    [
        check("email", "email es obligatorio").isEmail(),
        check("password", "la contraseña tiene que ser obligatoria o mayor a 6 dijitos").isLength({ min: 6 }),
        validarCampos
    ]
    , loginUsuario)

router.get("/renew", validarJWT ,revalidarToken)


module.exports = router