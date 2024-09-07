import { generateAIResponse } from "../controllers/index.js";
import { Router } from "express";

const router = Router();

router.get("/", generateAIResponse);

export default router;
