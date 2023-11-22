const {Empleado,DistritoJudicial, Zona,MunicipioDistro}=require("../utilidades/modelosBase");
/**
 * Modelo de Empleado
 */
Empleado.belongsTo(DistritoJudicial, { foreignKey: "id_distrito_judicial" });
DistritoJudicial.belongsTo(Zona, { foreignKey: "id_zona" })
DistritoJudicial.belongsTo(MunicipioDistro, { foreignKey: "id_municipio_distrito" })
module.exports = {Empleado,DistritoJudicial ,Zona,MunicipioDistro}; 