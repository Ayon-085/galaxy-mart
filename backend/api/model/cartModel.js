const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true,
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Please add atleast one quantity to finish up !'],
                default: 1
            },
            price: Number
        }],
        bill: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model("Cart", cartSchema);