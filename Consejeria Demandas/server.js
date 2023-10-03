
const express = require("express")
const {sequelize} = require("./models")
const cors = require("cors");

class Server{
    constructor(){
        this.app = express();
        this.port = 8080;

        this.conectarBD();
        this.middlewares();
    }
    
    async conectarBD(){
        await sequelize.sync();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use(express.json())
    }

    routes(){

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor de demandas en puerto ${this.port}`)
        })
    }


}

module.exports = Server;