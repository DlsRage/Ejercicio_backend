
import { validarUsuario, validarUsuarioParcial } from '../Schemas/usuariosVerificacion.js';
export class UsuarioController {
    constructor(modelUsuario) {
        this.modelUsuario = modelUsuario
    }
    getAll  = async (req, res) => {
        res.json(await this.modelUsuario.getAll())
    }
    getUnoID = async (req, res) => {
        const id = Number(req.params.id);
        const cliente = await this.modelUsuario.getUnoID(id)
        if (cliente) {
            return res.json(cliente)
        }
        res.status(404).json({ message: "Cliente no encontrado" })
    }
    EliminarCliente = async (req, res) => {
        const id = Number(req.params.id);
        const clientesDevolver = await this.modelUsuario.delete(id)
        if (clientesDevolver) {
           return res.json(clientesDevolver)
        }
        res.status(400).json({ message: "Cliente no encontrado" })
    }
    CrearCliente = async (req, res) => {
        const cliente = validarUsuario(req.body)
        if (cliente.error) {
            return res.status(400).json(cliente.error)
        }
        const nuevoCliente = await this.modelUsuario.create(cliente.data)
        res.json(nuevoCliente)
    }
    ModificarCliente = async (req,res) =>{
        const id = req.params.id
        const cliente = validarUsuarioParcial(req.body)
        if(cliente.error){
            return res.status(400).json('Validación de datos es Incorrecta')
        }
        const modificadoCliente = await this.modelUsuario.update(id,cliente.data)
        res.json(modificadoCliente)

    }
}