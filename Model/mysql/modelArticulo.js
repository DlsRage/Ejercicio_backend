import mysql from 'mysql2/promise';

const connectionDefault = {
    host: 'localhost',
    user: 'root',
    password: '',
    puerto: 3306,
    database: 'fullstack'
}

const pool = mysql.createPool(connectionDefault);

export class Articulo {
    static async getAll() {
        try {
            const [articulos] = await pool.query('SELECT * FROM articulos');
            return articulos;
        } catch (error) {
            throw new Error('Error al obtener los artículos: ' + error.message);
        }
    }

    static async getOneBiID(id) {
        try {
            const [articulo] = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
            if (articulo.length === 0) {
                return { message: "No existe ese artículo" };
            }
            return articulo;
        } catch (error) {
            throw new Error('Error al obtener el artículo: ' + error.message);
        }
    }

    static async delete(id) {
        try {
            const articulo = await this.getOneBiID(id);
            if (articulo.message) {
                return articulo;
            }
            await pool.query('DELETE FROM articulos WHERE id = ?', [id]);
            return { message: "Artículo eliminado", articulo };
        } catch (error) {
            throw new Error('Error al eliminar el artículo: ' + error.message);
        }
    }

    static async create(articulo) {
        try {
            articulo = articulo.data
            const [result] = await pool.query(
                'INSERT INTO articulos (titulo, cuerpo, usuario) VALUES (?, ?, ?)',
                [articulo.titulo, articulo.cuerpo, articulo.usuario]
            );
            return await this.getOneBiID(result.insertId);
        } catch (error) {
            throw new Error('Error al crear el artículo: ' + error.message);
        }
    }

    static async update(id, articulo) {
        try {
            const [articuloExistente] = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
            if (articuloExistente.length === 0) {
                return { message: "Artículo no encontrado" };
            }

            const nuevoArticulo = {
                ...articuloExistente[0],
                ...articulo.data
            };

            await pool.query(
                'UPDATE articulos SET titulo = ?, cuerpo = ?, usuario = ? WHERE id = ?',
                [nuevoArticulo.titulo, nuevoArticulo.cuerpo, nuevoArticulo.usuario, id]
            );

            return await this.getOneBiID(id);
        } catch (error) {
            throw new Error('Error al modificar el artículo: ' + error.message);
        }
    }
}