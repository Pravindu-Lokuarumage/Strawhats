const mongoose = require('mongoose');
module.exports = mongoose.model('review', new mongoose.Schema({
    user: String,
    comment: String,
    likes: Number
}));