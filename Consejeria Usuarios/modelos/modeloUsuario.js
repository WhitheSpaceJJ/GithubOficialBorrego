const {TipoUser,Zona,Usuario}=require("../utilidades/modelosBase");
Usuario.hasOne(Zona,{foreignKey:"id_zona"});
Usuario.hasOne(TipoUser,{foreignKey:"id_tipo_usuario"});
module.exports = {TipoUser,Zona,Usuario};