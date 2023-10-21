const {TipoUser,Zona,Usuario}=require("../utilidades/modelosBase");
Usuario.belongsTo(TipoUser,{foreignKey:"id_tipouser"});
Usuario.belongsTo(Zona,{foreignKey:"id_zona"})
module.exports = {TipoUser,Zona,Usuario};