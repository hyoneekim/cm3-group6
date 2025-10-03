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
            const user = await User.findOne({ username });
    if (!user) {
      throw Error("Incorrect username");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }

    // create a token
    const token = generateToken(user._id);

    res.status(200).json({ username, token });
        res.status(200).json({ username, token });
    } catch(error) {
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
    } = req.body;

    try{
        if(!name||
       !username||
        !password||
        !phone_number||
        !gender||
        !date_of_birth||
        !membership_status||
        !address){
            throw Error("All fields must be filled");
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
        const user = await User.create({
            name,
        username,
        password: hash,
        phone_number,
        gender,
        date_of_birth,
        membership_status,
        address
             });

        const token = generateToken(user._id);

        res.status(200).json({username, token})
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

module.exports = {signupUser, loginUser};