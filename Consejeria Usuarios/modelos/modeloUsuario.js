const {TipoUser,Usuario}=require("../utilidades/modelosBase");
/**
 * Modelo de la tabla usuario el cual extiende de la clase Model de sequelize
 * y se relaciona con los modelos de tipo de usuario y zona
 * */
Usuario.belongsTo(TipoUser,{foreignKey:"id_tipouser"});
module.exports = {TipoUser,Usuario};