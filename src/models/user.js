const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    // address: {
    //     type: String,
    //     required: true,
    // },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
},
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = async function () {
    const payload = {
        _id: this._id,
        email: this.email,
        role: this.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d',
    });
    return token;
};

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); // Convert _id to string
        return ret;
    },
});

userSchema.set('toObject', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); // Convert _id to string
        return ret;
    },
});

const User = mongoose.model('users', userSchema);

module.exports = User;