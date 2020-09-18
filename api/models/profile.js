const mongoose = require('mongoose');
module.exports = mongoose.model('profile', new mongoose.Schema({
    user: String,
    name: String,
    height: Number,
    weight: Number,
    age: Number,
    gender: String,
    friends: Array,
    goals: Object
}));