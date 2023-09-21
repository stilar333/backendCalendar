const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controlles/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const isDate = require("../helpers/isDate");


/* Obtener eventos */
const router = Router();

/* Todas tienen que pasar por la validacion del jwt */
router.use(validarJWT)


/* obtener eventos */
router.get("/", getEventos);

/* Crear un nuevo evento */
router.post("/", [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de Finalizacion es obligatoria").custom(isDate),
    validarCampos
], crearEvento)

/* editar evento */
router.put("/:id", [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de Finalizacion es obligatoria").custom(isDate),
    validarCampos], actualizarEvento)

/* elimiar evento */
router.delete("/:id", eliminarEvento)

module.exports = router