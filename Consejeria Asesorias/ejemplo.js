const controlAsesoria= require('./controles/controlAsesoria');
const filtros = [];
filtros.push({fecha: '2021-06-01'});
controlAsesoria.obtenerAsesoriasFiltro(filtros).then((result) => {
  console.log(result);
}).catch((err) => {
    console.log(err);
    });