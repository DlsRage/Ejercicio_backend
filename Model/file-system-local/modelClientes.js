import { clientes } from "../../Datos/clientes.js";
let clientesDevolver = clientes;

export class Cliente{
    static async getAll(){
        return clientesDevolver;
    }
    static async getUnoID(id){     
        return clientesDevolver.find(cliente => cliente.id == id);
    }
    static async delete(id){
        clientesDevolver = clientesDevolver.filter(cliente => cliente.id != id);
        return clientesDevolver;
    }
    static async create(cliente){
        const nuevoCliente = {
            id: clientesDevolver[clientesDevolver.length - 1].id + 1,
            ...cliente
        }
        clientesDevolver = [...clientesDevolver, nuevoCliente];
        return nuevoCliente;
    }
    static async update(id, cliente){
        const clienteIndice = clientesDevolver.findIndex(cliente => cliente.id == id);
        if(clienteIndice == -1){
            return {message: "Cliente no encontrado"};
        }
        const nuevoCliente = {
            ...clientesDevolver[clienteIndice],
            ...cliente
        }
        clientesDevolver[clienteIndice] = nuevoCliente;
        return nuevoCliente;
    }

}