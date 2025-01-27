import { Router } from "express";
import { UsuarioController } from "../Controller/UsuarioController.js";

export const RutasUsuario = (model) => {
    const routeUsuario = Router();
    const usuarioController = new UsuarioController(model);
    routeUsuario.get('/', usuarioController.getAll)

    routeUsuario.get('/:id', usuarioController.getUnoID)

    routeUsuario.delete('/:id', usuarioController.EliminarCliente)

    routeUsuario.post('/', usuarioController.CrearCliente)

    routeUsuario.put('/:id', usuarioController.ModificarCliente)
    return routeUsuario;
}
