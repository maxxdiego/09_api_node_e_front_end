import express from "express";
const app = express();
import mongoose from "./config/db-connection.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import gameRoutes from "./routes/gameRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", gameRoutes);
app.use("/", userRoutes);

// Rota principal
app.get("/", (req, res) => {
  res.json([
    {
      front_end: {
        href: "https://consumo-api-node.vercel.app/"
      },
      default_user: {
        email: "admin@email.com",
        password: "admin"
      }
    },
  ]);
});

// Rodando a API na porta 8080
const port = process.env.PORT || 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando na porta ${port}.`);
});

export default app;
