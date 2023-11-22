const controlAsesorias = require('../controles/controlAsesoria');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");
const controlPersonas = require('../controles/controlPersonas');
const ExcelJS = require('exceljs');
/**
 * @abstract Servicio  que permite obtener una asesoría por filtro
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria de la base de datos
 *  */
const obtenerAsesoriaFiltro = asyncError(async (req, res, next) => {
  const filtros = JSON.parse(req.query.filtros);
  console.log("Filtros", filtros);
  const result = await controlAsesorias.obtenerAsesoriasFiltro(filtros);
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
 * @abstract Servicio  que permite obtener una asesoría por filtro para paginación
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria de la base de datos
 * */
const obtenerAsesoriasPagina = asyncError(async (req, res, next) => {
  const pagina = req.query.pagina;
  const result = await controlAsesorias.obtenerAsesoriasPorPagina(pagina);
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
  const filtros = JSON.parse(req.query.filtros);
  console.log("Filtros", filtros);
  const result = await controlAsesorias.obtenerAsesoriasFiltro(filtros);
  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorías', 404);
    return next(error);
  } else {
    //Crear archivo excel con todos los datos de la asesoria uno por uno , luego que se descargue el archivo y cuando finalice se borre
    // Datos de ejemplo
    const asesoriasFiltradas = result;
    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Asesorías');

    // Agregar encabezados
    sheet.addRow(['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Edad', 'Teléfono', 'Estatus Trabajo', 'Número Hijos', 'Ingreso Mensual', 'Motivo', 'Estado Civil', 'Tipo Juicio', 'Recibidos', 'Defensor', 'Resumen Asesoría', 'Conclusión Asesoría', 'Estatus Requisitos', 'Fecha Registro', 'Usuario']);

    // Agregar datos al libro de Excel
    asesoriasFiltradas.forEach((asesoria) => {
      const persona = asesoria.persona;
      const asesorado = asesoria.asesorado;
      const datosAsesoria = asesoria.datos_asesoria;

      sheet.addRow([
        persona.nombre,
        persona.apellido_paterno,
        persona.apellido_materno,
        persona.edad,
        persona.telefono,
        asesorado.estatus_trabajo,
        asesorado.numero_hijos,
        asesorado.ingreso_mensual,
        asesorado.motivo.descripcion_motivo,  // Ajusta según la estructura real de tus datos
        asesorado.estado_civil.estado_civil,   // Ajusta según la estructura real de tus datos
        asesoria.tipos_juicio.tipo_juicio,     // Ajusta según la estructura real de tus datos
        asesoria.recibidos.map((recibido) => recibido.descripcion_catalogo).join(', '),  // Ajusta según la estructura real de tus datos
        asesoria.defensor.nombre_defensor,     // Ajusta según la estructura real de tus datos
        datosAsesoria.resumen_asesoria,
        datosAsesoria.conclusion_asesoria,
        datosAsesoria.estatus_requisitos,
        datosAsesoria.fecha_registro,
        datosAsesoria.usuario,
      ]);
    });

    // Configurar encabezados para la descarga
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=asesorias.xlsx');

    // Enviar el libro de Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
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
  const result2 = await controlPersonas.obtenerPersonasNombre(nombre, apellido_paterno, apellido_materno);
  if (result2 === null) {
    const error = new CustomeError('Error al obtener las personas', 404);
    return next(error);
  } else {
    const result = await controlAsesorias.obtenerAsesoriaPorIdAsesorados(result2);
    if (result === null || result === undefined) {
      const error = new CustomeError('Error al obtener las asesorías', 404);
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
  , obtenerAsesoriasPagina
};
