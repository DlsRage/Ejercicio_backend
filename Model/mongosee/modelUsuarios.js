import { model, Schema } from "mongoose";
import { conexion } from "./conexion.js";

conexion();

const usuarioSchema = new Schema(
    {
        _id: Number, 
        nombre: String,
        email: String,
        telefono: String,
        direccion: String
    },
    {
        versionKey: false 
    }
);

const usuarioClient = model('usuarios', usuarioSchema)

export class Usuario {
    static async getAll() {
        return await usuarioClient.find({});
    }

    static async getUnoID(id) {
        return await usuarioClient.findOne({ _id: id }); // Busca por _id numérico
    }

    static async delete(id) {
        return await usuarioClient.findOneAndDelete({ _id: id }); // Elimina por _id numérico
    }

    static async create(articulo) {

        const nuevoArticulo = new usuarioClient(articulo);
        return await nuevoArticulo.save();
    }

    static async update(id, articulo) {


        const articuloActualizado = await usuarioClient.findOneAndUpdate(
            { _id: id }, // Filtra por _id numérico
            articulo,
            { new: true }
        );

        if (!articuloActualizado) {
            throw new Error('Artículo no encontrado');
        }

        return articuloActualizado;
    }
}