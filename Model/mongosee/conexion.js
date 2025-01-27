import mongoose from "mongoose";
export const conexion = async () => {
  try {
    await mongoose.connect("mongodb+srv://Eric:12345@fullstack.f7lfr.mongodb.net/fullstack", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conectado correctamente");

  }
  catch (e) {
    console.log(e)
  }

}

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Conexión a MongoDB cerrada");
  process.exit(0);
});

