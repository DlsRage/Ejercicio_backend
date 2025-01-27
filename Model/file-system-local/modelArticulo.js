import { articulos } from "../../Datos/articulos.js";
let articulosDevolver = articulos;
export class Articulo {

    static async getAll() {
        return articulosDevolver;
    }
    static async getOneBiID(id) {
        return articulosDevolver.find(articulo => articulo.id == id);
    }

    static async delete(id) {
        articulosDevolver= articulosDevolver.filter(articulo => articulo.id != id);
        return articulosDevolver
    }

    static async create(articulo) {
        if (!articulo.success) {
            return Error;
        }

        const nuevoArticulo = {
            ...articulo.data
        }

        articulosDevolver = [...articulosDevolver, nuevoArticulo];
        return nuevoArticulo;
    }

    static async update(id, articulo) {
        if (!articulo.success) {
            return {message  : 'validacion de datos sale Incorrecto'}
        }

        const articuloIndice = articulosDevolver.findIndex(articulo => articulo.id == id);
        if (articuloIndice == -1) {
            return {message: "Articulo no encontrado"};
        }
        const nuevoArticulo = {
            ...articulosDevolver[articuloIndice],
            ...articulo.data
        }
        articulosDevolver[articuloIndice] = nuevoArticulo;
        return nuevoArticulo;
    }
}
