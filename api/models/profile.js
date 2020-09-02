const mongoose = require('mongoose');
module.exports = mongoose.model('profile', new mongoose.Schema({
    user: String,
    height: Number,
    weight: Number,
    age: Number,
    gender: Boolean
}));