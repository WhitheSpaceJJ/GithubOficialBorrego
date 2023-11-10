import Usuario from "./Usuario";
import Zona from "./Zona";
import TipoUsuario from "./TipoUsuario";

// Relaciones entre tablas

// Un usuario pertenece a una zona
Usuario.belongsTo(Zona, { foreignKey: "id_zona" });

// Un usuario pertenece a un tipo de usuario
Usuario.belongsTo(TipoUsuario, { foreignKey: "id_tipouser" });

export { Usuario, Zona, TipoUsuario };
