const {Asesorado,Motivo,EstadoCivil}=require("../utilidades/modelosBase");

Asesorado.hasOne(Motivo,{foreignKey:"id_motivo"});
Asesorado.hasOne(EstadoCivil,{foreignKey:"id_estado_civil"});

module.exports = {Asesorado,EstadoCivil,Motivo};