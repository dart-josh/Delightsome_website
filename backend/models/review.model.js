const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    products: {
        type: String,
    },
    reviewText: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: 'Anonymous'
    },
    reviewTimestamp: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;