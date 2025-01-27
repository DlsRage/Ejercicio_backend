import { Router } from "express";
import { ArticuloController } from "../Controller/ArticuloController.js";

export const RutasArticulo = (model) => {
    const articuloRouter = Router();
    const articuloController = new ArticuloController(model);

    articuloRouter.get('/', articuloController.getAll)
    articuloRouter.get('/:id', articuloController.getOneBiID)
    articuloRouter.delete('/:id', articuloController.delete)
    articuloRouter.post('/', articuloController.create)
    articuloRouter.put('/:id', articuloController.update)

    return articuloRouter;  
} 
