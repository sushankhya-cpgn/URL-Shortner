import express from "express";
import urlroutes from "../src/routes/urlRoute"

const app = express();
app.use(express.json());



// Routes
app.use("/api/url",urlroutes);


// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "URL Shortener API is running" });
});

export default app;