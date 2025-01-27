
import { validarCliente, validarClienteParcial } from '../Schemas/clientesVerificacion.js';

export class ClienteController {
    constructor(modelClientes) {
        this.modelClientes = modelClientes
    }
    getAll = async (req, res) => {
        res.json(await this.modelClientes.getAll())
    }
    getUnoID = async (req, res) => {
        const id = Number(req.params.id);
        const cliente = await this.modelClientes.getUnoID(id)
        if (cliente) {
            return res.json(cliente)
        }
        res.status(404).json({ message: "Cliente no encontrado" })
    }
    EliminarCliente = async (req, res) => {
        const id = Number(req.params.id);
        const clientesDevolver = await this.modelClientes.delete(id)
        if (clientesDevolver) {
           return res.json(clientesDevolver)
        }
        res.status(400).json({ message: "Cliente no encontrado" })
    }
    CrearCliente = async (req, res) => {
        const cliente = validarCliente(req.body)
        if (cliente.error) {
            return res.status(400).json(cliente.error)
        }
        const nuevoCliente = await this.modelClientes.create(cliente.data)
        res.json(nuevoCliente)
    }
    ModificarCliente = async (req,res) => {
        const id = req.params.id
        const cliente = validarClienteParcial(req.body)
        if(cliente.error){
            return res.status(400).json('Validación de datos es Incorrecta')
        }
        const modificadoCliente = await this.modelClientes.update(id,cliente.data)
        res.json(modificadoCliente)

    }
}