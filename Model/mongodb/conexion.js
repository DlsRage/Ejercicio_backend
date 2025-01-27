import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Eric:12345@fullstack.f7lfr.mongodb.net/?retryWrites=true&w=majority&appName=fullstack";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db;

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('fullstack'); // Nombre de la base de datos
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('Error de conexión a MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('No se ha conectado a la base de datos');
    }
    return db;
};