import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { generarJWT, generarId } from "../helpers/tokens.js";

const obtenerUsuarioCorreoPassword = async (req, res, next) => {
  // validar
  await check("email", "El email debe ser válido").isEmail().run(req);
  await check("password", "El password es obligatorio").not().isEmpty().run(req);
};

export { obtenerUsuarioCorreoPassword };
