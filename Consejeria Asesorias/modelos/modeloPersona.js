const { Persona, Domicilio, Genero } = require("../utilidades/modelosBase");
Persona.hasOne(Domicilio, { foreignKey: "id_domicilio" })
Persona.hasOne(Genero, { foreignKey: "id_genero" })
module.exports = { Persona ,Domicilio,Genero};