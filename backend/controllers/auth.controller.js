const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(200).json({
            success: false,
            message: "Please fill all the fields"
        });
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(200).json({
                success: false,
                message: "Email Id already exists, Kindly login"
            });
        }
        const newUser = new User({ name, email, password });
        let savedUser = await newUser.save();
        const token = await savedUser.generateAuthToken();
        return res.status(201).cookie('token', token, {
            sameSite: 'strict',
            expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
            httpOnly: true,
            secure: true
        }).json({
            success: true,
            message: "User registered successfully",
            user: savedUser.name
        })
    } catch (err) {
        return res.status(200).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
}

exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            sucess: false,
            message: "Please fill all the fields"
        });
    }
    try {
        const oldUser = await User.findOne({ email: email });
        if (!oldUser) {
            return res.status(200).json({
                success: false,
                message: "Invalid Credentials"
            });
        } else {
            const isMatch = await bcrypt.compare(password, oldUser.password);
            if (isMatch) {
                const token = await oldUser.generateAuthToken();
                return res.status(202).cookie('token', token, {
                    sameSite: 'strict',
                    expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
                    httpOnly: true,
                    secure: true
                }).json({
                    success: true,
                    message: "User login successfully",
                    user: oldUser.name
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Invalid Credentials"
                });
            }
        }
    } catch (err) {
        return res.status(200).json({
            success: false,
            message: "Something went wrong, please try again later"
        });
    }
}
