import express from 'express';
import { RutasArticulo } from './Rutas/RutaArticulo.js';
import { RutasCliente } from './Rutas/RutaCliente.js';
import { RutasUsuario } from './Rutas/RutaUsuario.js';
//import { connectDB } from './Model/mongodb/conexion.js'
//import { Articulo } from './Model/modelArticulo.js';
//import { Articulo } from './Model/mysql/modelArticulo.js';
import { Articulo } from './Model/file-system-local/modelArticulo.js';
import { Cliente } from './Model/file-system-local/modelClientes.js';
//import { Cliente } from './Model/mongosee/modelClientes.js';
import { Usuario } from './Model/file-system-local/modelUsuario.js';
//import { Usuario } from './Model/mongosee/modelUsuarios.js';

//import { Articulo } from './Model/mongosee/modelArticulo.js';
import  cors  from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))
app.use('/api/articulos',RutasArticulo(Articulo))
app.use('/api/clientes',RutasCliente(Cliente))
app.use('/api/usuarios',RutasUsuario(Usuario))


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () =>{
    console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`)
})