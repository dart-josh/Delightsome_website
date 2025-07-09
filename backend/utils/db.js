import { connect } from "mongoose";

const connectDB = async () => {
  const isDev = process.env.NODE_ENV === "development";
  const db_uri = isDev ? process.env.DEV_MONGODB_URI : process.env.MONGODB_URI;

  try {
    const conn = await connect(db_uri, {
      bufferCommands: false,
    });
    console.log(`Mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to mongodb: ${error.message}`);
    process.exit(1);
  }
};

export default { connectDB };
