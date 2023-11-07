

// Import the proto-loader module from gRPC
const protoLoader = require('@grpc/proto-loader');

// Define the path to the proto file
const PROTO_PATH = './route.proto';

// Load the proto file synchronously
// keepCase: Preserve field names. The default is to change them to camel case
// longs: Representation for long values. By default they are represented as a Number
// enums: Representation for enum values. By default they are represented as a Number
// defaults: Set default values for missing fields. The default is false
// oneofs: Represent oneof values as an object with a single property. The default is false
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Export the package definition
module.exports = {
  packageDefinition
}