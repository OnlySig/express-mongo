import mongoose from "mongoose";

async function connectarNoDb() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  //Note que, no exemplo acima, não é necessário adicionar await pois return já é implicitamente assíncrono.
  return mongoose.connection;
} 

export default connectarNoDb;