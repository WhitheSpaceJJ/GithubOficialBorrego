require('dotenv').config();


const Server = require("./schemas/server");

const server = new Server();
server.listen();

