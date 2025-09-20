import express from "express";
import { nanoid } from "nanoid";
import UrlObject from "../models/url.js";
import { generateShortID, getURL } from "../controllers/url.js";

const router = express.Router();

// Create short URL
router.post("/", generateShortID);

router.get("/:url",getURL);

export default router;