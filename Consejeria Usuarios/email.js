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