    import { Router } from "express";
import { ClienteController } from "../Controller/ClienteController.js";

export const RutasCliente = (model) => {
    const clienteController = new ClienteController(model);
    const routeCliente = Router();
    routeCliente.get('/', clienteController.getAll)
    routeCliente.get('/:id', clienteController.getUnoID)
    routeCliente.delete('/:id', clienteController.EliminarCliente)
    routeCliente.post('/', clienteController.CrearCliente)
    routeCliente.put('/:id', clienteController.ModificarCliente)

    return routeCliente;
}

