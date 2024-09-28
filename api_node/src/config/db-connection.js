import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:7Z6ZAz4pwGDMHBZx@cluster0.v2pgk.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
  );

  const connection = mongoose.connection;

  connection.on("error", () => {
    console.log("Unable to connect to Mongo database.");
  });

  connection.on("open", () => {
    console.log("Successfully connected to the database!");
  });
};

connect();

export default mongoose;
