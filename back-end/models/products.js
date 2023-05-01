const mongoose = require('mongoose');

//---Creates a schema for inserting into mongodb document---
const productSchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    distributor_info: {
        type: String,
        default: '',
    },
    model: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
    },
    sales: {
        type: Number,
        default: 0,
    },
    warranty_status: {
        type: String,
        required: true,
    },
});

//---Model, shows which document will the data inserted. And shows which schema will be used---
const Products = mongoose.model('products', productSchema);

module.exports = Products;
