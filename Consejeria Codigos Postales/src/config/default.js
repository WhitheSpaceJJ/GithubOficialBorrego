
const dotenv = require('dotenv'); // Importamos dotenv
dotenv.config(); // Invocamos el metodo config de dotenv




const DBHOST = process.env.DBHOST || 'localhost'; // Obtenemos el valor de la variable de entorno DBHOST o usamos localhost por defecto
const DBUSER = process.env.DBUSER || 'root'; // Obtenemos el valor de la variable de entorno DBUSER o usamos root por defecto
const DBPASSWORD = process.env.DBPASSWORD || '1234'; // Obtenemos el valor de la variable de entorno DBPASSWORD o usamos 1234 por defecto
const DATABASE = process.env.DATABASE || 'consejeria_codigos_postales'; // Obtenemos el valor de la variable de entorno DATABASE o usamos consejeria por defecto
const PORT = process.env.PORT || 3001; // Obtenemos el valor de la variable de entorno PORT o usamos el puerto 3000 por defecto
const DBPORT = process.env.DBPORT || 3306; // Obtenemos el valor de la variable de entorno DBPORT o usamos el puerto 3306 por defecto

module.exports = {
    DBHOST,
    DBUSER,
    DBPASSWORD,
    DATABASE,
    PORT,
    DBPORT
}


