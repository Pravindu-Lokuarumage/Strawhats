const mongoose = require('mongoose');
module.exports = mongoose.model('data', new mongoose.Schema({
    user: String,
    heartrate: Array,
    stepsperd: Array,
    calories: Array
}));