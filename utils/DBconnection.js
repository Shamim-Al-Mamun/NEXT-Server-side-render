import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    process.env.MONGOURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  // console.log(db.connections)
  connection.isConnected = db.connections[0].readyState;
  // console.log(connection.isConnected)
}

export default dbConnect;
