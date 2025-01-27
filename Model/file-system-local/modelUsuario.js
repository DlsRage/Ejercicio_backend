import { usuarios } from "../../Datos/usuarios.js";
let usuariosDevolver = usuarios;
export class Usuario{
    static async getAll(){
        return usuariosDevolver;
    }
    static async getUnoID(id){     
        return usuariosDevolver.find(usuario => usuario.id == id);
    }
    static async delete(id){
        usuariosDevolver = usuariosDevolver.filter(usuario => usuario.id != id);
        return usuariosDevolver;
    }
    static async create(usuario){
        const nuevoUsuario = {
            id: usuariosDevolver[usuariosDevolver.length - 1].id + 1,
            ...usuario
        }
        usuariosDevolver = [...usuariosDevolver, nuevoUsuario];
        return nuevoUsuario;
    }
    static async update(id, usuario){
        const usuarioIndice = usuariosDevolver.findIndex(usuario => usuario.id == id);
        if(usuarioIndice == -1){
            return {message: "Cliente no encontrado"};
        }
        const nuevoUsuario = {
            ...usuariosDevolver[usuarioIndice],
            ...usuario
        }
        usuariosDevolver[usuarioIndice] = nuevoUsuario;
        return nuevoUsuario;
    }

}