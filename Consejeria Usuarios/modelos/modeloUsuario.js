const {TipoUser,Zona,Usuario}=require("../utilidades/modelosBase");
/**
 * Modelo de la tabla usuario el cual extiende de la clase Model de sequelize
 * y se relaciona con los modelos de tipo de usuario y zona
 * */
Usuario.belongsTo(TipoUser,{foreignKey:"id_tipouser"});
Usuario.belongsTo(Zona,{foreignKey:"id_zona"})
module.exports = {TipoUser,Zona,Usuario};