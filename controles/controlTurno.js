const modeloTurno = require('../modelos/modeloTurno');

const obtenerTurnos = async () => {
  try {
    return await modeloTurno.Turno.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const obtenerTurnoPorId = async (id) => {
  try {
    return await modeloTurno.Turno.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const agregarTurno = async (turno) => {
  try {
    const result = await modeloTurno.Turno.create(turno, { raw: true, nest: true });
    const turno2 = result.dataValues;
    return turno2.id_turno;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const eliminarTurno = async (id) => {
  try {
    await modeloTurno.Turno.destroy({ where: { id_turno: id } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

const actualizarTurno = async (turno) => {
  try {
    await modeloTurno.Turno.update(turno, { where: { id_turno: turno.id_turno } });
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
};

module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  agregarTurno,
  eliminarTurno,
  actualizarTurno,
};
