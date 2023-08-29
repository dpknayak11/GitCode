const path = require('path')
const User = require('../model/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getSingUpForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'singup-page.html'));
}
const getSingInForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'singin-page.html'));
}

const postSingUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ where: { email: email } });
        if (existUser) { return res.status(404).json({ message: "This Email-Id User already exists!" }) }
        else {
            if (name == null || email == null || password == null) {
                return res.status(500).json({ message: "something went wrong" });
            }
            else {
                const saltRounds = 10;
                // const hashedPswd = await bcrypt.hash(password, saltRounds);
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    console.log(err);
                    const userDetails = await User.create({ name: name, email: email, password: hash });
                    console.log("userDetails: ", userDetails)
                    return res.status(201).json({ user: userDetails });
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

function generateAccessToken(id, email, password) {
    return jwt.sign({ userId: id, email: email, password: password },"secret");
}

const postSingInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (email == null || password == null) {
            return res.status(404).json({ message: "something went wrong" })
        } else {
            const existUser = await User.findOne({ where: { email: email } })
            // const token = generateAccessToken(existUser.id, existUser.email, existUser.password);
            if (existUser) {
                bcrypt.compare(password, existUser.password, (err, result) => {
                    if (result == true) {
                        return res.status(200).json({ 
                            success: true,
                            message: "Login Successful!",
                            token: generateAccessToken(existUser.id, existUser.email, existUser.password),
                        });
                    } else { return res.status(401).json({ message: "User not authorized" }) }
                })
            } else { return res.status(404).json({ message: 'User not found' }) }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    getSingUpForm,
    getSingInForm,
    postSingUpUser,
    postSingInUser,
  }