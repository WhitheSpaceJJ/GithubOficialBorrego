/*
const nodemailer = require('nodemailer');

async function enviarContraseñaPorCorreo() {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sesobregonmensajes@gmail.com',
      pass: 'geitiamxwzmxnvnm',
     // pass: 'consejeria.juridica',
      },
    });
    const opcionesCorreo = {
      from: 'consejeria.juridica.1966@gmail.com',
      to: "josejesusorozcohernandez502@gmail.com",
      subject: 'Recuperación de contraseña',
      text: `Tu nueva contraseña es: 2`,
    };
    try {
     const a= await transporter.sendMail(opcionesCorreo);
     console.log(a);
      return true;
    } catch (error) {
        console.log(error.message);
      return false;
    }
  }
enviarContraseñaPorCorreo();

const express = require('express');
const app = express();
const json2csv = require('json2csv').parse;
const fs = require('fs');


app.get('/download-municipios-excel', (req, res) => {
  try {
    const municipios = [
      { id: 1, nombre: 'Municipio A', poblacion: 10000 },
      { id: 2, nombre: 'Municipio B', poblacion: 15000 },
      { id: 3, nombre: 'Municipio C', poblacion: 20000 },
    ];

    if (!municipios || municipios.length === 0) {
      res.status(404).json({ error: 'No se encontraron datos de municipios.' });
      return;
    }

    const csv = json2csv(municipios, { header: true });
    fs.writeFileSync('municipios.csv', csv, 'utf-8');

    res.download('municipios.csv', 'municipios.csv', (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al descargar el archivo.' });
      } else {
        fs.unlink('municipios.csv', (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
          } else {
            console.log('Archivo eliminado con éxito.');
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
*/