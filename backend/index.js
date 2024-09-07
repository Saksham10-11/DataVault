import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Passport } from "passport";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { genAIRouter } from "./routes/index.js";
import cors from "cors";

dotenv.config();

const url = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: url,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
};

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/genai", genAIRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} ...`);
});
