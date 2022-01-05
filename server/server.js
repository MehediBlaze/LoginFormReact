import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import "dotenv/config";

// Server Configuration
const app = express();
const PORT = process.env["PORT"] || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://login-form-reactjs-frontend.netlify.app"
        ],
        credentials: true
    })
);

// Mongo Setup
mongoose.connect(
    process.env["MONGO_URI"],
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) console.error(err);
        console.log("Database connected");
    }
);

// Setup Routes
app.use("/auth", authRouter);

// Home page
app.get("/", (req, res) => {
    res.json({ msg: "welcome" });
});

// Start App
app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
});
