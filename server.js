import express from "express";
import colors from "colors";
import dbConnection from "./config/db.js";
import cors from "cors";
import router from "./routers/authRouter.js";
import dotenv from 'dotenv'
dotenv.config()
//  Date Base Connection
dbConnection();

const app = express();

// Converting Data into Json Formate
app.use(express.json());

// CROS is established
app.use(cors());
app.use("/uploads", express.static('./uploads'))

// Use of Router
app.use(router)

const port = process.env.PORT || 7100;

app.listen(port, () => {
  console.log(`Server is Running on ${port} port`.bgMagenta)
});