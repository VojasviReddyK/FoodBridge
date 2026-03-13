import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";

// Temporary OTP storage
const otpStore = {};

// =============================
// REGISTER USER
// =============================
export const registerUser = async (req, res) => {
    try {


        const { name, email, password, role, location } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists. Please login."
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            location
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            token: generateToken(user._id)
        });


    } catch (error) {


        res.status(500).json({
            message: error.message
        });


    }
};

// =============================
// LOGIN USER
// =============================
export const authUser = async (req, res) => {

    try {


        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not registered. Please register first."
            });
        }

        if (!(await user.matchPassword(password))) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            token: generateToken(user._id)
        });


    } catch (error) {


        res.status(500).json({
            message: error.message
        });


    }

};

// =============================
// GET USER PROFILE
// =============================
export const getUserProfile = async (req, res) => {

    try {


        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location
        });


    } catch (error) {


        res.status(500).json({
            message: error.message
        });


    }

};

// =============================
// FORGOT PASSWORD - SEND OTP
// =============================
export const forgotPassword = async (req, res) => {

    try {


        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found. Please register first."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        otpStore[email] = otp;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "FoodBridge Password Reset OTP",
            text: `Your OTP is ${otp} `
        });

        res.json({
            message: "OTP sent successfully"
        });


    } catch (error) {


        console.error(error);

        res.status(500).json({
            message: "Failed to send OTP"
        });


    }

};

// =============================
// VERIFY OTP
// =============================
export const verifyOTP = async (req, res) => {

    try {


        const { email, otp } = req.body;

        if (otpStore[email] == otp) {

            res.json({
                message: "OTP verified successfully"
            });

        } else {

            res.status(400).json({
                message: "Invalid OTP"
            });

        }


    } catch (error) {


        res.status(500).json({
            message: "OTP verification failed"
        });


    }

};

// =============================
// RESET PASSWORD
// =============================
export const resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.password = password;

        await user.save();

        delete otpStore[email];

        res.json({
            message: "Password updated successfully"
        });


    } catch (error) {


        res.status(500).json({
            message: "Password reset failed"
        });


    }

};
