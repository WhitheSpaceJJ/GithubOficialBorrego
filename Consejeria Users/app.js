import express from 'express';
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from './config/db.js';

// Create express instnace
const app = express();

// Init body-parser settings
app.use(express.json());


//habilitar cookie parser
app.use(cookieParser());

//habilitar csrf
app.use(csrf({cookie: true}));


// Connect to database
try {
    await db.authenticate();
    db.sync();
    console.log('Connection DB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Routes
app.use('/usuario', usuarioRoutes);

// Define port
const port = process.env.PORT || 3002;

// Run server
app.listen(port, () => console.log(`Server running on port ${port}!`)

);