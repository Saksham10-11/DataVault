import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { genAIRouter, authRouter, formsRouter } from "./routes/index.js";
import cors from "cors";

dotenv.config();

const url = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: url,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
};

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/genai", genAIRouter);
app.use("/auth", authRouter);
app.use("/forms", formsRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} ...`);
});
