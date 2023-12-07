// Importamos la librería para cargar archivos .proto
const protoLoader = require('@grpc/proto-loader')
// Definimos la ruta al archivo .proto
const PROTO_PATH = 'route.proto'

// Cargamos el archivo .proto y definimos las opciones de carga
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true, // Conserva el formato original de los nombres de los campos
    longs: String, // Representa los valores long como strings
    enums: String, // Representa los valores de los enums como strings
    defaults: true, // Asigna valores por defecto a los campos
    oneofs: true // Genera una propiedad adicional en los objetos con el nombre del campo oneof
  })

// Exportamos la definición del paquete
module.exports = {
  packageDefinition
}