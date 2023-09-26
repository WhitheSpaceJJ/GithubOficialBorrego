const {Asesoria,Asesor,Turno,Asesorado,
   DetalleAsesoriaCatalogo,TipoJuicio}=require("../utilidades/modelosBase");


Asesoria.hasOne(Asesor, { foreignKey: "id_asesor" })
Asesoria.hasOne(Turno, { foreignKey: "id_turno" })
Asesoria.hasOne(Asesorado, { foreignKey: "id_asesorado"})
Asesoria.hasMany(DetalleAsesoriaCatalogo,{foreignKey:"id_asesoria"});
Asesoria.hasOne(TipoJuicio, { foreignKey: "id_tipo_juicio" })

module.exports = {Asesoria
  ,Asesor,Turno,Asesorado,
  DetalleAsesoriaCatalogo,TipoJuicio
};