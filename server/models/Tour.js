const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

const Tour = mongoose.model("user", tourSchema);
module.exports = Tour;