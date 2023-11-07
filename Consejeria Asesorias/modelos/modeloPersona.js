const { Persona, Domicilio, Genero } = require("../utilidades/modelosBase");
/**
 * Modelo de persona con sus relaciones a domicilio y genero    
 * */   

Persona.hasOne(Domicilio, { foreignKey: "id_domicilio" })
Persona.hasOne(Genero, { foreignKey: "id_genero" })
module.exports = { Persona ,Domicilio,Genero};