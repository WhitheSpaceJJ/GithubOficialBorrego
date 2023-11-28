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
 * @abstract Servicio  que permite obtener una asesoría por filtro para exportar a excel
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesoria de la base de datos
 * */
const obtenerAsesoriaFiltroExcel = asyncError(async (req, res, next) => {
  const filtros = JSON.parse(req.query.filtros);
  const campos = JSON.parse(req.query.campos);
  const result = await controlAsesorias.obtenerAsesoriasFiltro(filtros);

  if (result === null || result === undefined) {
    const error = new CustomeError('No se encontraron asesorías', 404);
    return next(error);
  } else {
    const asesoriasFiltradas = result;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Asesorías');

    // Mapear los encabezados según los campos solicitados
    const encabezados = [];
    const encabezadosMappings = {
      'nombre-usuario': 'Nombre de Usuario',
      'nombre-empleado': 'Nombre Empleado', // Ajusta según sea necesario
      'genero': 'Género',
      'colonia': 'Colonia',
      'trabaja': 'Trabaja',
      'ingreso_mensual': 'Ingreso Mensual',
      'motivo': 'Motivo',
      'estado_civil': 'Estado Civil',
      'telefono': 'Teléfono',
      'numero_hijos': 'Número de Hijos',
      'fecha_registro': 'Fecha de Registro',
      'tipo_juicio': 'Tipo de Juicio',
      'conclusion': 'Conclusión',
      'documentos-recibidos': 'Documentos Recibidos',
      'usuario-cumple-requisitos': 'Usuario Cumple Requisitos',
      'hora-atencion': 'Hora de Atención',
      'fecha-atencion': 'Fecha de Atención',
      'usuario-turnado': 'Usuario Turnado',
      'responsable-turno': 'Responsable de Turno',
      'resumen': 'Reumen de Hechos',
    };

    campos.forEach((campo) => {
      if (encabezadosMappings[campo]) {
        encabezados.push(encabezadosMappings[campo]);
      }
    });

    // Agregar encabezados al libro de Excel
    sheet.addRow(encabezados);
    // Agregar datos al libro de Excel
    asesoriasFiltradas.forEach((asesoria) => {
      const persona = asesoria.persona;
      const asesorado = asesoria.asesorado;
      const datosAsesoria = asesoria.datos_asesoria;
      const turno = asesoria.datos_asesoria;
      const recibidos = asesoria.recibidos;
      const filaDatos = [];

      // Mapear los datos según los campos solicitados
      campos.forEach((campo) => {
        switch (campo) {
          case 'nombre-usuario':
            filaDatos.push(persona.nombre);
            break;
          case 'nombre-empleado':
            if (asesoria.defensor !== null) {
              filaDatos.push(asesoria.defensor.nombre_defensor);
            }
            else if (asesoria.asesor !== null) {
              filaDatos.push(asesoria.asesor.nombre_asesor);
            }
            break;
          case 'genero':
            filaDatos.push(persona.genero.descripcion_genero);
            break;
          case 'colonia':
            filaDatos.push(persona.domicilio.calles_domicilio + ' ' + persona.domicilio.numero_exterior_domicilio + ' ' + persona.domicilio.numero_interior_domicilio);
            break;
          case 'trabaja':
            filaDatos.push(asesorado.estatus_trabajo ? 'Sí' : 'No');
            break;
          case 'ingreso_mensual':
            filaDatos.push(asesorado.ingreso_mensual || 'N/A');
            break;
          case 'motivo':
            filaDatos.push(asesorado.motivo.descripcion_motivo);
            break;
          case 'estado_civil':
            filaDatos.push(asesorado.estado_civil.estado_civil);
            break;
          case 'telefono':
            filaDatos.push(persona.telefono);
            break;
          case 'numero_hijos':
            filaDatos.push(asesorado.numero_hijos);
            break;
          case 'fecha_registro':
            filaDatos.push(datosAsesoria.fecha_registro);
            break;
          case 'tipo_juicio':
            filaDatos.push(asesoria.tipos_juicio.tipo_juicio);
            break;
          case 'conclusion':
            filaDatos.push(datosAsesoria.conclusion_asesoria);
            break;
          case 'documentos-recibidos':
            filaDatos.push(recibidos.map((recibido) => recibido.descripcion_catalogo).join(', '));
            break;
          case 'usuario-cumple-requisitos':
            filaDatos.push(datosAsesoria.estatus_requisitos ? 'Sí' : 'No');
            break;
          case 'hora-atencion':
            filaDatos.push(turno.hora_turno ? turno.hora_turno : 'N/A');
            break;
          case 'fecha-atencion':
            filaDatos.push(turno.fecha_turno ? turno.fecha_turno : 'N/A');
            break;
          case 'usuario-turnado':
            filaDatos.push(datosAsesoria.usuario ? datosAsesoria.usuario : '');
            break;
          case 'responsable-turno':
            filaDatos.push(datosAsesoria.usuario ? datosAsesoria.usuario : '');
            break;
          case 'resumen':
            filaDatos.push(datosAsesoria.resumen_asesoria ? datosAsesoria.resumen_asesoria : '');
            break;
        }
      });
      sheet.addRow(filaDatos);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=asesorias.xlsx');

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

/**
 * @abstract Servicio  que permite obtener todas las asesorías
 */
const obtenerAsesoriaTotal=  asyncError(async (req, res, next) => {
  const result = await controlAsesorias.obtenerTotalAsesoriasSistema();
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener las asesorías', 404);
    return next(error);
  } else {
    res.status(200).json({
      totalAsesorias: result
    });
  }
});

/**
 * @abstract Servicio  que permite obtener todas las asesorías
 */
const obtenerAsesoriaFiltroTotal= asyncError(async (req, res, next) => {
  const filtros = JSON.parse(req.query.filtros);
  const result = await controlAsesorias.obtenerTotalAsesorias(filtros);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener las asesorías', 404);
    return next(error);
  } else {

    res.status(200).json({
      totalAsesoriasFiltro: result
    });
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
,
obtenerAsesoriaTotal,
obtenerAsesoriaFiltroTotal
};
