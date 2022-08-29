const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [{
            productId: {
                type: String,
                required: true
            },
            supplier: {
                type: String,
                required: true
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Please add atleast one quantity to finish up !'],
            },
            price: Number,
            status: {
                type: String,
                default: ""
            }
        }],
        ship: [],
        shippingAddress: {
            address: {
                type: String,
            },
            city: {
                type: String,
                required: true
            }
        },
        trx: {
            id: { type: String },
            status: { type: String },
        },
        itemsPrice: {
            type: Number,
            required: true
        },
        shippingPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        // to_pay: {
        //     type: String,
        // },
        isPaid:{
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date,
            default: ""
        },
        paymentProcessed:{
            type: Boolean,
            default: false
        },
        isShipped: {
            type: Boolean,
            default: false
        },
        shippedAt: {
            type: Date,
            default: ""
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        deliveredAt: {
            type: Date,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);
