const controlAsesoria= require('./controles/controlAsesoria');
const controlEmpleado= require('./controles/controlEmpleados');
/*
controlEmpleado.obtenerEmpleados().then((resultados) => {
    console.log("Empleado ",JSON.stringify(resultados));
}) .catch((error) => {

    console.error('Error:', error.message); 
}
);

*/
// Ejemplo de uso
const filtrosEjemplo = {
    fecha_registro: '2023-12-16', // ajusta la fecha según tus datos
    id_empleado: 2, // ajusta el ID según tus datos
    id_zona: 3, // ajusta el ID según tus datos
    id_municipio: 251, // ajusta el ID según tus datos
  };
  console.log('Filtros:', JSON.stringify(filtrosEjemplo));
  controlAsesoria.obtenerAsesoriasFiltro(filtrosEjemplo)
    .then((resultados) => {
      console.log('Asesorías filtradas:', JSON.stringify(resultados));
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
 /*    
controlAsesoria.obtenerAsesoriasPorPagina(1)
    .then((resultados) => {
        console.log("Asesoria 1",resultados[0]);
        console.log("Asesorías: total  de asesorias",resultados.length);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });

    */