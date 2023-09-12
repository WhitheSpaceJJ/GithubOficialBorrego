const {Asesoria,Asesor,Turno,Asesorado,
   DetalleAsesoriaCatalogo}=require("../utilidades/modelosBase");


Asesoria.hasOne(Asesor, { foreignKey: "id_asesor" })
Asesoria.hasOne(Turno, { foreignKey: "id_turno" })
Asesoria.hasOne(Asesorado, { foreignKey: "id_asesorado"})
Asesoria.hasMany(DetalleAsesoriaCatalogo,{foreignKey:"id_asesoria"});

module.exports = {Asesoria
  ,Asesor,Turno,Asesorado,
  DetalleAsesoriaCatalogo
};