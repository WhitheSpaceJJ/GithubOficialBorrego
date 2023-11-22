const {Asesoria,Empleado,Turno,Asesorado,
   DetalleAsesoriaCatalogo,TipoJuicio,DistritoJudicial}=require("../utilidades/modelosBase");

/*
* Modelo de asesoria el cual contiene los atributos de una asesoria y establece
 las relaciones con los modelos de asesor, turno,tipo de juicio, asesorado y detalle asesoria catalogo
*/
Asesoria.belongsTo(Empleado, { foreignKey: "id_empleado" })
Asesoria.belongsTo(Turno, { foreignKey: "id_turno" })
Asesoria.belongsTo(Asesorado, { foreignKey: "id_asesorado"})
Asesoria.hasMany(DetalleAsesoriaCatalogo,{foreignKey:"id_asesoria"});
Asesoria.belongsTo(TipoJuicio, { foreignKey: "id_tipo_juicio" })

Empleado.belongsTo(DistritoJudicial, { foreignKey: "id_distrito_judicial" });



module.exports = {Asesoria
  ,Turno,Asesorado,Empleado,
  DetalleAsesoriaCatalogo,TipoJuicio,
  DistritoJudicial
};