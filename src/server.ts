import { config } from "dotenv";
import mongoose from "mongoose";
import app from "./app";
// Load environment variables
config();

// Connect to MongoDB
const MONGODB_URI = process.env.uri && process.env.db_password && process.env.uri?.replace("<db_password>",process.env.db_password) || '';

console.log(MONGODB_URI);  

const PORT = process.env.PORT || 8000;
  
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });



app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
