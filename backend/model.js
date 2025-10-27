const mongoose = require('mongoose');

const BisectionSchema = new mongoose.Schema({
    id: Number,
    fx: String,
    xl: Number,
    xr: Number,
    error: Number
}, { collection: 'bisection' });

module.exports = mongoose.model('Bisection', BisectionSchema);
