import express from "express";
import {
    obtenerUsuarioCorreoPassword,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/usuario", obtenerUsuarioCorreoPassword);

export default router;