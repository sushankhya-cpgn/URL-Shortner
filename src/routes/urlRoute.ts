import express from "express";
import { deleteShortURL, generateShortID, getClicks, getmyurls, getURL } from "../controllers/url.js";

const router = express.Router();

// Create short URL
router.post("/", generateShortID);
router.get("/getlongurl/:url",getURL);
router.get("/geturls",getmyurls)
router.get("/analytics/:url",getClicks);
router.delete("/deleteshortURL/:url",deleteShortURL);



export default router;