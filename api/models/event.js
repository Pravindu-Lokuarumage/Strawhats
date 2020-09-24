const mongoose = require('mongoose');
module.exports = mongoose.model('event', new mongoose.Schema({
    name: String,
    users: Array,
    start: Date,
    end: Date,
    data: Array
}));