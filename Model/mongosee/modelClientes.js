import { model, Schema } from "mongoose";
import { conexion } from "./conexion.js";

conexion();

const clienteSchema = new Schema(
    {
        id: Number, 
        nombre: String,
        puesto: String,
        email: String,
        telefono: String
    },
    {
        versionKey: false 
    }
);

const modelClient = model('clientes', clienteSchema)

export class Cliente {
    static async getAll() {
        return await modelClient.find({});
    }

    static async getUnoID(id) {
        return await modelClient.findOne({ id: id }); // Busca por _id numérico
    }

    static async delete(id) {
        return await modelClient.findOneAndDelete({ id: id }); // Elimina por _id numérico
    }

    static async create(articulo) {

        const nuevoArticulo = new modelClient(articulo);
        return await nuevoArticulo.save();
    }

    static async update(id, articulo) {


        const articuloActualizado = await modelClient.findOneAndUpdate(
            { id: id }, // Filtra por _id numérico
            articulo,
            { new: true }
        );

        if (!articuloActualizado) {
            throw new Error('Artículo no encontrado');
        }

        return articuloActualizado;
    }
}