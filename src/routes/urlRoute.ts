import express from "express";
import { generateShortID, getClicks, getURL } from "../controllers/url.js";

const router = express.Router();

// Create short URL
router.post("/", generateShortID);

router.get("/:url",getURL);

router.get("/analytics/:url",getClicks);

export default router;