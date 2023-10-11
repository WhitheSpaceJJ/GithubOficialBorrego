const Participante = require('../models/participante');

class ParticipanteDAO{
    constructor(){}

    async crearParticipante({nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona}){
        try{
            const participante = await Participante.create({nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona});
            return participante;
        }catch(err){
            throw err;
        }
    }

    async obtenerParticipantes(){
        try{
            const participantes = await Participante.findAll();
            return participantes;
        }catch(err){
            throw err;
        }
    }

    async obtenerParticipantePorId(id){
        try{
            const participante = await Participante.findByPk(id);
            return participante;
        }catch(err){
            throw err;
        }
    }

    async actualizarParticipante(id, {nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona}){
        try{
            const participante = await Participante.update({nombre, edad, DTYPE, id_escolaridad, id_etnia, id_ocupacion, id_persona}, {where: {id}});
            return participante;
        }catch(err){
            throw err;
        }
    }

    async eliminarParticipante(id){
        try{
            const participante = await Participante.findByPk(id);
            if(!participante){
                throw new Error('No existe el participante');
            }
            await participante.destroy();
            return 'participante eliminado con exito';
        }catch(err){
            throw err;
        }
    }
}

module.exports = new ParticipanteDAO();