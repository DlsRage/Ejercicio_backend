import { model, Schema } from "mongoose";
import { conexion } from "./conexion.js";

conexion();

const articuloSchema = new Schema(
    {
        _id: Number, 
        titulo: String,
        cuerpo: String,
        usuario: String,
    },
    {
        versionKey: false 
    }
);

const ArticuloSchema = model('Articulo', articuloSchema);

export class Articulo {
    static async getAll() {
        return await ArticuloSchema.find({});
    }

    static async getOneBiID(id) {
        return await ArticuloSchema.findOne({ _id: id }); // Busca por _id numérico
    }

    static async delete(id) {
        return await ArticuloSchema.findOneAndDelete({ _id: id }); // Elimina por _id numérico
    }

    static async create(articulo) {
        if (!articulo.success) {
            throw new Error('Validación de datos incorrecta');
        }

        const nuevoArticulo = new ArticuloSchema(articulo.data);
        return await nuevoArticulo.save();
    }

    static async update(id, articulo) {
        if (!articulo.success) {
            throw new Error('Validación de datos incorrecta');
        }

        const articuloActualizado = await ArticuloSchema.findOneAndUpdate(
            { _id: id }, // Filtra por _id numérico
            articulo.data,
            { new: true }
        );

        if (!articuloActualizado) {
            throw new Error('Artículo no encontrado');
        }

        return articuloActualizado;
    }
}