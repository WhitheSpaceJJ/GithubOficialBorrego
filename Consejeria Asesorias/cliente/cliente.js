
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './route.proto';

/**
 * Carga el archivo proto
 */
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Exporta el paquete
module.exports = {
  packageDefinition
}