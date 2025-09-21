import express from "express";
import urlroutes from "../src/routes/urlRoute"
import authroutes from "../src/routes/authRoute"
import {verifyToken} from "../src/middleware/authMiddleware"

const app = express();
app.use(express.json());



// Routes
app.use("/api/url",verifyToken,urlroutes);
app.use("/api/auth",authroutes)


// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "URL Shortener API is running" });
});

export default app;