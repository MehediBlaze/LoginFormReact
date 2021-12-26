import Router from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// Endpoint for Register
router.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: "User Already Exists!" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        firstName,
        lastName,
        email,
        passwordHash
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
        {
            user: savedUser._id
        },
        process.env["JWT_SECRET"]
    );

    res.cookie("token", token, {
        maxAge: 1200000,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).send();
});

// Endpoint for Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email or Password is missing" });
    }

    const matchUser = await User.findOne({ email });

    if (!matchUser) {
        return res.status(401).json({ msg: "Email or Password is invalid!" });
    }

    const matchPassword = await bcrypt.compare(
        password,
        matchUser.passwordHash
    );

    if (!matchPassword) {
        return res.status(401).json({ msg: "Email or Password is invalid!" });
    }

    const token = jwt.sign(
        {
            user: matchUser._id
        },
        process.env["JWT_SECRET"]
    );

    res.cookie("token", token, {
        maxAge: 1200000,
        httpOnly: true,
        sameSite: "none",
        secure: true
    }).send();
});

// Endpoint for Logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
});

// Endpoint to check if logged in
router.get("/loggedin", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    jwt.verify(token, process.env["JWT_SECRET"], (err, decoded) => {
        if (err) {
            return res.json(false);
        }
    });
    return res.json(true);
});

export default router;
