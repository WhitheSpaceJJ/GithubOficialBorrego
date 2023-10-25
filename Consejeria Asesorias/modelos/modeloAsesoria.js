const {Asesoria,Asesor,Turno,Asesorado,
   DetalleAsesoriaCatalogo,TipoJuicio}=require("../utilidades/modelosBase");


Asesoria.belongsTo(Asesor, { foreignKey: "id_asesor" })
Asesoria.belongsTo(Turno, { foreignKey: "id_turno" })
Asesoria.belongsTo(Asesorado, { foreignKey: "id_asesorado"})
Asesoria.hasMany(DetalleAsesoriaCatalogo,{foreignKey:"id_asesoria"});
Asesoria.belongsTo(TipoJuicio, { foreignKey: "id_tipo_juicio" })

module.exports = {Asesoria
  ,Asesor,Turno,Asesorado,
  DetalleAsesoriaCatalogo,TipoJuicio
};