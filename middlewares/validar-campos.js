const {response} = require("express");
const {validationResult} = require("express-validator")

const validarCampos = (req, res= response, next)=>{

    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        console.log(errors.mapped());
        return res.status(400).json(
            {
                "ok": false,
                errors: errors.mapped()
            }
        )
    }


    next()
}

module.exports = {
    validarCampos,
}