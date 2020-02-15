const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
        default: '-'
    },
    category: {
        type: String,
        default: '-'
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Tour = mongoose.model("tour", tourSchema);
module.exports = Tour;