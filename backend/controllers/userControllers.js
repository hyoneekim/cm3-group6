const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");


const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "3d"
    });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            throw Error("All fields are required");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Not strong enough password");
        }
        const exists = await User.findOne({ username })
        if (exists) {
            throw Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ username, password: hash });

        const token = generateToken(user._id);

        res.status(200).json({ username, token });
    } catch {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const {
        name,
        username,
        password,
        phone_number,
        gender,
        date_of_birth,
        membership_status,
        bio,
        address,
        profile_picture
    } = req.body
}