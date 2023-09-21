
const Evento = require("../models/Evento");



const getEventos = async (req, res) => {
    const eventos = await Evento.find()
        .populate("user", "name");
    res.json({
        ok: true,
        eventos: eventos
    })
}




const crearEvento = async (req, res) => {
    /* verificar que hay evento */
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}


const actualizarEvento = async (req, res) => {
    const eventoid = req.params.id;
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventoid);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "evento no existe por ese ID"
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "no hay previlegios para editar este evento"
            })
        }

        const nuevoEvento= {
            ...req.body,
            user: uid
        }
        const eventoAcualizado = await Evento.findByIdAndUpdate(eventoid, nuevoEvento, {new: true});


        res.json({
            ok: true,
            evento: eventoAcualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }


}

const eliminarEvento = async (req, res) => {
    const eventoid = req.params.id;
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventoid);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "evento no existe por ese ID"
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "no hay previlegios para editar este evento"
            })
        }

        await Evento.findByIdAndDelete(eventoid)

        res.json({
            ok: true,
            evento: "Se borro Correctamente"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}