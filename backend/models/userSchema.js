const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: {
            unique: true,
        },
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//Hashing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

//Generating token
userSchema.methods.generateAuthToken = async function () {
    console.log('Auth Token');
    try {
        let token = jwt.sign(
            {
                userId: this._id,
                username: this.name
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            });
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;