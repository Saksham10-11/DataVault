import express from "express";
import bodyParser from "body-parser";
import { Passport } from "passport";
import multer from "multer";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} ...`);
});
