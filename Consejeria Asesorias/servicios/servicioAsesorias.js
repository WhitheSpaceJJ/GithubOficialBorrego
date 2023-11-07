const controlAsesorias = require('../controles/controlAsesoria');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
const controlPersonas = require('../controles/controlPersonas');

/**
 * @abstract Servicio  que permite obtener una asesoría por filtro
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria de la base de datos
 *  */
const obtenerAsesoriaFiltro = asyncError(async (req, res, next) => {
  const filtro = [];
  const result = await controlAsesorias.obtenerAsesoriasFiltro(filtro);
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorías', 404);
    return next(error);
  } else {
    res.status(200).json({
      asesorias: result
    });
  }
}
);

/**
 * @abstract Servicio  que permite obtener una asesoría por filtro para excel el cual el usuario puede descargar
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria de la base de datos
 * */
const obtenerAsesoriaFiltroExcel = asyncError(async (req, res, next) => {
  const filtro = [];
  const result = await controlAsesorias.obtenerAsesoriasFiltro(filtro);
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorías', 404);
    return next(error);
  } else {
  
  }

});

/**
 * @abstract Servicio  que permite agregar una asesoría
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  @returns {Object} asesoria agregada a la base de datos
 */

const agregarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.agregarAsesoria(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar una asesoría', 400);
    return next(error);
  } else {

    res.status(201).json({
      asesoria: result
    });
  }
});

/**
 *  @abstract Servicio  que permite obtener todas las asesorías
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesorías  de la base de datos
 */

const obtenerAsesorias = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.obtenerAsesorias();
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorías', 404);
    return next(error);
  } else {

    res.status(200).json({
      asesorias: result
    });
  }
});

/**
 * @abstract Servicio  que permite eliminar una asesoría
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} mensaje de confirmación de eliminación de asesoría
 */

const eliminarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.eliminarAsesoria(req.params.id);
  if (result === false) {
    const error = new CustomeError('Error al eliminar la asesoría', 400);
    return next(error);
  } else {

    res.status(200).json({
      menssage: "La asesoria ha sido eliminada"
    });
  }
});

/**
 *  
 * @abstract Servicio  que permite actualizar una asesoría
 *  @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria actualizada en la base de datos
 */

const actualizarAsesoria = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.actualizarAsesoria(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar la asesoría', 400);
    return next(error);
  } else {

    res.status(200).json({
      asesoria: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener una asesoría por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria de la base de datos
 */

const obtenerAsesoriaPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesorias.obtenerAsesoriaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la asesoría', 404);
    return next(error);
  } else {

    res.status(200).json({
      asesoria: result
    });
  }


});

/**
 * @abstract Servicio  que permite obtener una asesoría por   nombre de la persona  asesorada
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria   de la base de datos   por nombre de la persona asesorada
 */

const obtenerAsesoriaNombre = asyncError(async (req, res, next) => {
  const { nombre, apellido_materno, apellido_paterno } = req.query;
  const result2 = await controlPersonas.obtenerPersonaNombre(nombre, apellido_paterno, apellido_materno);
  if (result2 === null) {
    const error = new CustomeError('Error al obtener la persona', 404);
    return next(error);
  } else {
    const personaJSON = JSON.stringify(result2);
    const persona = JSON.parse(personaJSON);
    const result = await controlAsesorias.obtenerAsesoriaPorIdAsesorado(result2.id_persona);
    if (result === null || result === undefined) {
      const error = new CustomeError('Error al obtener la asesoría', 404);
      return next(error);
    } else {

      res.status(200).json({
        asesoria: result
      });
    }

  }
});


//Module exports
module.exports = {
  agregarAsesoria,
  obtenerAsesorias,
  eliminarAsesoria,
  actualizarAsesoria,
  obtenerAsesoriaPorId,
  obtenerAsesoriaNombre,
  obtenerAsesoriaFiltro,
  obtenerAsesoriaFiltroExcel
};
