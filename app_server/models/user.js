const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    phone: { 
        type: String,
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true 
    },
    passwordHash: { 
        type: String, 
        required: true
    }
},
{ timestamps: true });

mongoose.model('User', userSchema);