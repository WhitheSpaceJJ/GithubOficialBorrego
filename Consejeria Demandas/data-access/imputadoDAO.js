
const Imputado = require("../schemas/imputadoSchema");

class ImputadoDAO{

    async crearImputado({id_participante, delito}){
        try{
            const imputado = await Imputado.create({id_participante, delito});
            return imputado;
        } catch(err){
            throw err;
        }
    }

    async obtenerImputados(){
        try{
            const imputados = await Imputado.findAll();
            return imputados;
        } catch(err){
            throw err;
        }
    }

    async obtenerImputadoPorId(id){
        try{
            const imputado = await Imputado.findByPk(id);
            return imputado;
        } catch(err){
            throw err;
        }
    }

    async actualizarImputado(id, {id_participante, delito}){
        try{
            const imputado = await Imputado.update({id_participante, delito}, {where: {id}});
            return imputado;
        } catch(err){
            throw err;
        }
    }

    async eliminarImputado(id){
        try{
            const imputado = await Imputado.findByPk(id);
            if(!imputado){
                throw new Error('Denuncia no encontrada');    
            }
            await imputado.destroy();
            return "Imputado eliminado con exito.";
        } catch(err){
            throw err;
        }
    }

}

module.exports =  new ImputadoDAO()