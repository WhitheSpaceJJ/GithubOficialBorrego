const {Asesorado,Motivo,EstadoCivil}=require("../utilidades/modelosBase");

Asesorado.belongsTo(Motivo,{foreignKey:"id_motivo"});
Asesorado.belongsTo(EstadoCivil,{foreignKey:"id_estado_civil"});

module.exports = {Asesorado,EstadoCivil,Motivo};