const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    item: String,
    quantity: Number
})

module.exports = mongoose.model('order', orderSchema)