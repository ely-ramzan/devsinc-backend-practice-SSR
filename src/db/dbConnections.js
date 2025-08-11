import mongoose from "mongoose";

let connection = null;

const connectToMongoDb = async (url) => {
  if (!connection) connection = await mongoose.connect(url);

  return connection;
};

export { connectToMongoDb };
