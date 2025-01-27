import { getDB } from './conexion.js';

export class Articulo {
    static async getAll() {
        try {
            const db = getDB();
            const articulos = await db.collection('articulos').find().toArray();
            return articulos
        } catch (error) {
            return { error: error.message };
        }
    }
    static async getOneBiID(id) {
        try {
            const db = getDB();
            const articulo = await db.collection('articulos').findOne({ _id: id });
            if (!articulo) {
                return { message: 'Artículo no encontrado' };
            }
            return articulo;
        } catch (error) {
            return { error: error.message };
        }
    }

    static async delete(id) {
        try {
            const db = getDB();
            const result = await db.collection('articulos').deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return { message: 'Artículo no encontrado' };
            }
            return { message: 'Artículo eliminado' };
        } catch (error) {
            return { error: error.message };
        }

    }

    static async create(articulo) {
        try {
            const db = getDB();
            const result = await db.collection('articulos').insertOne(articulo.data);
            const nuevoArticulo = await db.collection('articulos').findOne({ _id: result.insertedId });
            return nuevoArticulo;
        } catch (error) {
            return { error: error.message };
        }
    }
    static async update(id, articulo) {
        try {
            const db = getDB();
            const {titulo, cuerpo, usuario} = articulo.data
            const result = await db.collection('articulos').updateOne(
                { _id: id },
                { $set: { titulo, cuerpo, usuario } }
            );
            if (result.matchedCount === 0) {
                return { message: 'Artículo no encontrado' };
            }
            const actualizado  =  await db.collection('articulos').findOne({_id: id})
            return { message: 'Artículo actualizado', actualizado };
        } catch (error) {
            return { error: error.message };
        }
    }
}


/*
export const createArticulo = async (req, res) => {
    try {
        const db = getDB();
        const { titulo, cuerpo, usuario } = req.body;
        const nuevoArticulo = { titulo, cuerpo, usuario };
        const result = await db.collection('articulos').insertOne(nuevoArticulo);
        res.status(201).json({ _id: result.insertedId, ...nuevoArticulo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateArticulo = async (req, res) => {
    try {
        const db = getDB();
        const { titulo, cuerpo, usuario } = req.body;
        const result = await db.collection('articulos').updateOne(
            { _id: req.params.id },
            { $set: { titulo, cuerpo, usuario } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json({ message: 'Artículo actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteArticulo = async (req, res) => {
    
};*/