const express = require("express");
const cors = require("cors");
const sequelize = require("../config/db")


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.middlewares();
        this.conectarBD();

    }

    async conectarBD(){
        await sequelize.sync();
    }

    middlewares(){
        this.app.use( express.json() )
        this.app.use( cors() );
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`El servidor de demandas está corriendo en el puerto ${process.env.PORT}`)
        })
    }

}

module.exports = Server