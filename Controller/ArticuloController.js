import { validarArticulo, validarParcial } from "../Schemas/articulosVerificacion.js";

export class ArticuloController {
    constructor(modelArticulo) {
        this.Articulo = modelArticulo;
    }
    getAll = async (request, response) => {
        response.json(await this.Articulo.getAll());
    }
    getOneBiID = async (request, response) => {
        const id = Number(request.params.id);
        const articulo = await this.Articulo.getOneBiID(id);
        if (articulo) {
            return response.json(articulo);
        }
        response.status(404).json( {message: "Articulo no encontrado"} ); //no encontrado
    }
    delete = async (request, response) => {
        const id = Number(request.params.id);
        const articulosDevolver = await this.Articulo.delete(id);
        if (articulosDevolver) {
            response.json(articulosDevolver);
        }
        else {
            response.status(400).end();
        }
    }
    create = async (request, response)  =>{
        const articulo = validarArticulo(request.body);
        if (articulo.error) {
            return response.status(400).json('Validación de datos es Incorrecta');
        }

        const nuevoArticulo = await this.Articulo.create(articulo);
        response.json(nuevoArticulo);

    }

    update = async (request, response) => {
        const id = Number(request.params.id);
        const articuloValidado = validarParcial(request.body);
        const nuevoArticulo = await this.Articulo.update(id, articuloValidado);
        response.json(nuevoArticulo)
    }

}
